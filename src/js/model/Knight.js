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
    this.isJumping = false;
    this.isIdle = true;
    this.isAttacking = false;

    this.health = new Heart(5);
    this.isInLava = false;
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

    let offSet = 3;
    this.isInLava = false;

    if(collisions["lava"] && collisions["bottom"] && !collisions["solid"]) {
      return;
    }

    if(collisions["lava"] && !collisions["bottom"]) {
      console.log("HERE")
      this.isInLava = true;
      this.velY = 0;

      if (collisions["col"].solid.right) {
        this.x = collisions["right"].x - halfWidth - offSet;
      }
      else if (collisions["col"].solid.left) {
        this.x = halfWidth + collisions["left"].x + collisions["left"].w + offSet;
      }

      return;
    }

    if (collisions["left"]) {
      this.x = halfWidth + collisions["left"].x + collisions["left"].w + offSet;
    }
    if (collisions["right"]) {
      this.x = collisions["right"].x - halfWidth - offSet;
    }

    if (collisions["top"]) {
      this.velY = 0.01;
      this.y = halfHeight + collisions["top"].y + collisions["top"].h;
    }

    if (collisions["bottom"] && this.velY > 0) {
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
      this.setCoords(29, 600);
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
      this.isIdle = false;
      this.velY = -15;
      this.isJumping = true;
    }

    if(this.isAttacking) {

    }
  }

  update(du) {
    this.isIdle = true;
    this.checkForControls(du);
    this.handleCollisions(du);
    this.handleBoundary();
    if (this.velY === 0) {
      this.isJumping = false; // might want to change this later
    }
    this.checkForLava();

  }

  setCoords(x, y) {
    this.x = x;
    this.y = y;
  }

  renderHealth(ctx) {
    this.health.render(ctx);
  }

  render(ctx, xView, yView) {
    this.drawCollisions(this.collisions);
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isJumping, this.isIdle, this.isAttacking);
  }
}
