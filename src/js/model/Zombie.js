class Zombie extends Entity {

  constructor(x, y, knight) {
    super();

    this.sprite = new ZombieSprite();

    this.isIdle = true;
    this.isAttacking = false;
    this.isDead = false;

    this.knight = knight;

    this.x = x;
    this.y = y;
    this.speed = 4;

    this.spanRange = 800;
    this.dirX = 0;

    this.runSpeed = 10;
    this.walkSpeed = 5;
    this.velY = 0;
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

    //Move x direction
    if( diffX > 0 ) {
      this.x += this.speed * du;
    }else {
      this.x -= this.speed * du;
    }

    //Move y direction
    if( diffY > 0 ) {
      this.y += this.speed * du;
    }else {
      this.y -= this.speed * du;
    }

  }

  update(du) {
    this.applyGravity(du);
    this.autoMovement(du);
    this.handleCollisionsWithPlatform(du);
  }

  render(ctx, xView, yView) {
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
  }


}
