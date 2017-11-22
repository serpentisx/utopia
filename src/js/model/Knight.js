class Knight extends Entity {

  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;

    this.sprite = new KnightSprite();
    this.rotation = 0;
    this.velX = 8;
    this.velY = 0;

    this.GO_LEFT = KEY_A;
    this.GO_RIGHT = KEY_D;
    this.JUMP = KEY_W;

    this.dirX = 0;

    this.tokenManager = new TokenManager(this);

    this.hasWon = false;

    this.isJumping = false;
    this.isIdle = true;
    this.isAttacking = false;

    this.facingDirection = 'right';

    this.health = new Heart(5);
    this.isInLava = false;

    this.burningSound = new Audio();
    this.burningSound.src = 'sounds/burn.mp3';
    this.burningSound.loop = true;

    this.jumpSound = new Audio();
    this.jumpSound.src = 'sounds/jump.wav';
    this.jumpSound.volume = 0.2;

    this.winSound = new Audio();
    this.winSound.src = 'sounds/win.mp3';
    this.winSound.volume = 0.5;

    this.bossIsDead = false;
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  handleCollisions(du) {
    const halfWidth = this.sprite.width / 2;
    const halfHeight = this.sprite.height / 2;

    this.applyGravity(du);

    let collisions = this.detectCollisionsWithPlatform();
    this.collisions = collisions;

    let offSet = 0;

    if (collisions["lava"] && collisions["bottom"] && !collisions["solid"]) {
      return;
    }

    if (collisions["lava"] && !collisions["bottom"]) {

      if (!this.isInLava) {
        this.isInLava = true;
        this.burningSound.play();
      }
      this.velY = 0;

      if (collisions["col"].solid.right) {
        this.x = collisions["right"].x - halfWidth - offSet;
      }
      else if (collisions["col"].solid.left) {
        this.x = halfWidth + collisions["left"].x + collisions["left"].w + offSet;
      }

      return;
    }
    else {
      this.isInLava = false;
      this.burningSound.pause();
    }

    if (collisions["left"]) {
      this.x = halfWidth + collisions["left"].x + collisions["left"].w + offSet;
    }
    if (collisions["right"]) {
      this.x = collisions["right"].x - halfWidth - offSet;
    }

    if (collisions["top"]) {
      if (Math.abs(this.velY) > 0 && (Math.abs(collisions["top"].x - this.x + halfWidth) == 81 || Math.abs(collisions["top"].x - this.x + halfWidth) == 128)) {
        return;
      }
      this.velY = 0.01;
      this.y = halfHeight + collisions["top"].y + collisions["top"].h;
    }

    if (collisions["bottom"] && this.velY > 0) {
      // hard coded
      if (Math.abs(this.velY) > 0 && (Math.abs(collisions["bottom"].x - this.x + halfWidth) == 81 || Math.abs(collisions["bottom"].x - this.x + halfWidth) == 128)) {
        this.y = collisions["bottom"].y - halfHeight + 1;
        return;
      }
      this.velY = 0;
      this.y = collisions["bottom"].y - halfHeight + 1;
    }
  }

  checkForLava() {
    if(this.isInLava) {
      this.health.depleteLifePoints();
    }

    if(this.health.lifePoints < 0) {
      // Play some death scene
      this.setCoords(30, 600);
      this.health.lifePoints = 5;
    }
  }

  checkForControls(du) {
    if (keys[this.GO_LEFT]) {
      this.isIdle = false;
      this.dirX = -1;
      this.x -= this.velX * du;
    } else if (keys[this.GO_RIGHT]) {
      this.isIdle = false;
      this.dirX = 1;
      this.x += this.velX * du;
    }

    if (keys[this.JUMP] && !this.isJumping) {
      this.jumpSound.play();
      this.isIdle = false;
      this.velY = -15;
      this.isJumping = true;
    }
  }

  checkForGameOver() {
    if(this.tokenManager.hasCollectedAll() && this.x > 4700 && this.y < canvas.height && this.bossIsDead) {
      this.winSound.play();
      this.hasWon = true;
    }
  }

  update(du) {
    if(!this.hasWon) {
      this.isIdle = true;
      this.checkForControls(du);
      this.handleCollisions(du);
      this.handleBoundary();
      if (this.velY === 0) {
        this.isJumping = false;
      }
      this.checkForLava();
      this.tokenManager.update();
      this.checkForGameOver();
    }
    else this.x += this.velX*du;
  }

  setCoords(x, y) {
    this.x = x;
    this.y = y;
  }

  renderHealth(ctx) {
    this.health.render(ctx);
  }

  render(ctx, xView, yView) {
    this.tokenManager.render(ctx, xView, yView);
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isJumping, this.isIdle, this.isAttacking);
  }
}
