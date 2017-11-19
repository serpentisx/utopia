class Orc extends Entity{
  constructor(x, y) {
    super();

    this.sprite = new OrcSprite();
    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;


    this.isIdle = true;
    this.isJumping = false;

    this.walkSpeed = 4;
    this.velY = 0;

    this.x = x;
    this.y = y;
    this.velX = 8;
    this.velY = 0;
    this.dirX = 0;

    this.attackRange = {
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

  autoMovement(du) {
    const diffX = this.knight.x - this.x,
          diffY = this.knight.y - this.y;

	if(this.knight.isJumping && this.velY == g_gravity * du) {
        this.isJumping = true;
        this.velY = -13;
        //this.y = this.knight.y - this.walkSpeed;
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

  }

  update(du) {
    this.isIdle = true;
    const diffXabs = Math.abs(this.knight.x - this.x),
          diffYabs = Math.abs(this.knight.y - this.y);

    this.applyGravity(du);

    if(this.attackRange.x > diffXabs && this.attackRange.y > diffYabs) {
      this.autoMovement(du);
    }

    this.handleCollisionsWithPlatform(du);
    this.handleBoundary();

    if (this.velY === 0) {
      this.isJumping = false; // might want to change this later
    }
  }

  render(ctx, xView, yView) {
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isIdle, this.isJumping);
  }

}
