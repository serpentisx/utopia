class Orc extends Entity{
  constructor(x, y) {
    super();

    this.sprite = new OrcSprite();
    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;
    this.live = 1;

    this.isIdle = true;
    this.isJumping = false;
    this.isAttacking = false;

    this.walkSpeed = 7;
    this.velY = 0;

    this.x = x;
    this.y = y;
    this.velX = 8;
    this.velY = 0;
    this.dirX = 0;

    this.awakeRange = {
      x: 500,
      y: this.y/ 7
    };
  }

  handleCollisionsWithPlatform(du) {
    const halfWidth = this.sprite.width / 2;
    const halfHeight = this.sprite.height / 2;

    let collisions = this.detectCollisionsWithPlatform();

    let offSet = 3;

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

  collidesWithKnight() {
    return Utils.collidesWithRectangleTopLeft(this.getAttackOffsetRect(), this.knight.getEntityRectTopLeft());
  }

  getAttackOffsetRect() {
    let offset = 18;
    return {
      x: this.x - offset * this.dirX - this.sprite.width / 2,
      y: this.y - this.sprite.height / 2,
      w: this.sprite.width,
      h: this.sprite.height
    }
  }
  /**
   * Make the Orc follows and attack the knight automatically
   */
  autoMovement(du) {
    const diffX = this.knight.x - this.x,
          diffY = this.knight.y - this.y;

    let collidesWithKnight = this.collidesWithKnight();

    //FOLLOW
	  if(this.knight.isJumping && this.velY == g_gravity * du) {
        this.isJumping = true;
        this.velY = -15;
    }

    if(Math.abs(diffX) > this.walkSpeed * du && !collidesWithKnight) {
      //Move x direction
      if( diffX > 0) {
        this.isIdle = false;
        this.dirX = 1;
        this.x += this.walkSpeed*du;
      }else {
        this.isIdle = false;
        this.dirX = -1;
        this.x -= this.walkSpeed*du;
      }
    }

    //ATTACK!
    if(collidesWithKnight) {
      this.isIdle = false;
      this.isAttacking = true;
      this.knight.health.depleteLifePoints();
    }
  }
  checkDeath() {
    if(this.live <= 0) {
      this.kill();
    }
  }

  update(du) {
    if(!this.isDeadNow) {
      this.isIdle = true;
      this.isAttacking = false;
      const diffXabs = Math.abs(this.knight.x - this.x),
            diffYabs = Math.abs(this.knight.y - this.y);

      this.applyGravity(du);

      if(this.awakeRange.x > diffXabs && this.awakeRange.y > diffYabs) {
        this.autoMovement(du);
      }

      this.handleCollisionsWithPlatform(du);
      //Check lives
      if(this.collidesWithKnight() != null && this.knight.isAttacking) {
        this.live--;
        if(this.knight.x < this.x) {
          this.x += 50;
        } else {
          this.x -= 50;

        }
      }
      this.handleBoundary();

      if (this.velY === 0) {
        this.isJumping = false; // might want to change this later
      }
      this.checkDeath();
    }
  }

  render(ctx, xView, yView) {
    if(!this.isDeadNow) {
      this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
    }
  }

}
