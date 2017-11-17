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
    this.spanRange = 800;
    this.dirX = 0;

    this.runSpeed = 10;
    this.walkSpeed = 5;
    this.velY = 0;

    this.attackRange = {
      x: 700,
      y: this.walkSpeed
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
    const diffX = this.knight.x - this.x;
    this.isIdle = true;

    if( Math.abs(du-diffX) > this.walkSpeed ) {
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

    //Move y direction but zombie doesn't need to
    // if( diffY > 0 ) {
    //   this.y += this.speed * du;
    // }else {
    //   this.y -= this.speed * du;
    // }

  }

  update(du) {
    const diffXabs = Math.abs(this.knight.x - this.x),
          diffYabs = Math.abs(this.knight.y - this.y);
    console.log(diffYabs);

    this.applyGravity(du);

    if(this.attackRange.x > diffXabs) {
      console.log("attack!!!!!");
      this.autoMovement(du);
    }else {
      console.log("not attack");
    }

    this.handleCollisionsWithPlatform(du);
    this.handleBoundary();
  }

  render(ctx, xView, yView) {
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
  }


}
