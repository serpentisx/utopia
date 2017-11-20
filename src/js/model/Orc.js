class Orc extends Entity{
  constructor(x, y) {
    super();

    this.sprite = new OrcSprite();
    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;
    this.live = 1;

    this.isIdle = true;
    this.isJumping = false;
    this.isAttacking = false;

    this.walkSpeed = 4;
    this.velY = 0;

    this.x = x;
    this.y = y;
    this.velX = 8;
    this.velY = 0;
    this.dirX = 0;

    this.awakeRange = {
      x: 500,
      y: this.y
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
    let knight = {
      x: this.knight.x,
      y: this.knight.y,
      w: this.knight.sprite.width,
      h: this.knight.sprite.height
    };
    let orc = {
      x: this.x,
      y: this.y,
      w: this.sprite.width,
      h: this.sprite.height
    }
    return Utils.collidesWithRectangle(knight, orc);
  }
  /**
   * Make the Orc follows and attack the knight automatically
   */
  autoMovement(du) {
    const diffX = this.knight.x - this.x,
          diffY = this.knight.y - this.y;
    //FOLLOW
	  if(this.knight.isJumping && this.velY == g_gravity * du) {
        this.isJumping = true;
        this.velY = -15;
    }

    if( Math.abs(du-diffX) > this.walkSpeed) {
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
    if(this.collidesWithKnight() != null) {
        this.isIdle = false;
        this.isAttacking = true;
    }
  }
  checkDeath() {
    if(this.live <= 0) {
      //console.log("orc is dead");
      this.kill();
    }
  }

  update(du) {
    this.isIdle = true;
    this.isAttacking = false;
    const diffXabs = Math.abs(this.knight.x - this.x),
          diffYabs = Math.abs(this.knight.y - this.y);

    this.applyGravity(du);

    if(this.awakeRange.x > diffXabs && this.awakeRange.y > diffYabs) {
      this.autoMovement(du);
    }

    this.handleCollisionsWithPlatform(du);
    this.handleBoundary();

    if (this.velY === 0) {
      this.isJumping = false; // might want to change this later
    }
    //Check lives
    if(this.collidesWithKnight() != null && this.knight.isAttacking) {
        this.live--;
    }
    this.checkDeath();
  }

  render(ctx, xView, yView) {
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isIdle, this.isJumping);
  }

}
