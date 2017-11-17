class Orc extends Entity{
  constructor(x, y , knight) {
    super();
    this.sprite = new OrcSprite();


    this.isIdle = true;
    this.isAttacking = false;
    this.isDead = false;

    this.walkSpeed = 7;
    this.velY = 0;

    this.x = x;
    this.y = y;
    this.knight = knight;
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

  update(du) {
    //this.isIdle = true;
    const diffXabs = Math.abs(this.knight.x - this.x),
          diffYabs = Math.abs(this.knight.y - this.y);

    this.applyGravity(du);

    // if(this.attackRange.x > diffXabs && this.attackRange.y > diffYabs) {
    //   console.log("attack!!!!!");
    //   this.autoMovement(du);
    // }else {
    //   console.log("not attack");
    // }

    this.handleCollisionsWithPlatform(du);
    this.handleBoundary();
  }

  render(ctx, xView, yView) {
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
  }

}
