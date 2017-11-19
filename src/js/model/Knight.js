class Knight extends Entity {

  constructor(obj) {
    super();

    for (let prop in obj) {
      this[prop] = obj[prop];
    }

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

    this.health = 5;
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  getHealth() {
    return this.health;
  }

  handleCollisions(du) {

    const halfWidth = this.sprite.width / 2;
    const halfHeight = this.sprite.height / 2;

    this.applyGravity(du);

    let collisions = this.detectCollisionsWithPlatform();
    this.collisions = collisions;

    let offSet = 3;
    if(collisions["lava"] && !collisions["bottom"]) {
      this.health--;
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
        // hard coded
       /* if ((collisions["right"] || collisions["left"]) &&
          Math.abs(this.velY) > du * this.gravity &&
          (Math.abs(collisions["bottom"].x - this.x + halfWidth) == 143 ||
            Math.abs(collisions["bottom"].x - this.x + halfWidth) == 131)) return;*/

        this.velY = 0;
        this.y = collisions["bottom"].y - halfHeight + 1;
      }

  }

  update(du) {
    this.isIdle = true;

    if (keys[this.GO_LEFT])  {
      this.isIdle = false;
      this.dirX = -1;
      this.x -= this.velX * du;
    }
    else if (keys[this.GO_RIGHT]) {
      this.isIdle = false;
      this.dirX = 1;
      this.x += this.velX * du;
    }

    if (keys[this.JUMP] && !this.isJumping) {
      this.isIdle = false;
      this.velY = -15;
      this.isJumping = true;
    }

    this.handleCollisions(du);
    this.handleBoundary();

    if (this.velY === 0) {
      this.isJumping = false; // might want to change this later
    }
  }

  render(ctx, xView, yView) {
    this.drawCollisions(this.collisions);
    this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isJumping, this.isIdle);
  }
}
