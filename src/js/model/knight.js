class Knight extends Entity {

  constructor(sprite, obj) {
    super();

    for (let prop in obj) {
      this[prop] = obj[prop];
    }

    this.sprite = sprite;
    this.rotation = 0;
    this.velX = 8;
    this.velY = 0;
    this.gravity = 0.32;

    this.GO_LEFT = KEY_A;
    this.GO_RIGHT = KEY_D;
    this.JUMP = KEY_W;

    this.isJumping = false;
  }

  setMap(map) {
    this.map = map;
  }

  applyGravity(du) {
    let finalVelY = this.velY + this.gravity * du,
      avgVelY = (this.velY + finalVelY) / 2,
      dPosY = avgVelY * du;

    this.y += dPosY;
    this.velY = finalVelY;
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  drawCollisions(collisions) {
    for (var i in collisions) {
      this.map.drawTile(collisions[i].x, collisions[i].y);
    }
  }

  handleCollisions(du) {

    let halfWidth = this.sprite.width / 2;
    let halfHeight = this.sprite.height / 2;
    this.applyGravity(du);

    let collisions = this.detectCollisionsWithPlatform();
    this.collisions = collisions;

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
    if (collisions["bottom"]) {
      // hard coded
      if (collisions["right"] && Math.abs(collisions["bottom"].x - this.x + halfWidth) == 83) return;

      this.velY = 0;
      this.y = collisions["bottom"].y - halfHeight + 1;
    }
  }

  detectCollisionsWithPlatform() {
    let w = this.sprite.width / 2;
    let tiles = this.map.getRectTiles(this.x, this.y);
    let collisions = [];

    tiles.forEach(tile => {
      let collision = this.collidesWithPlatform(tile);
      if (collision && this.map.isSolidTileAtXY(tile.x, tile.y)) {
        collisions[collision] = tile;
      }
    });
    return collisions;
  }

  // Two rectangles collision check
  collidesWithPlatform(p) {
    var x = this.x - this.sprite.width / 2;
    var y = this.y - this.sprite.height / 2;
    var w = this.sprite.width;
    var h = this.sprite.height;
    var dx = (x + w / 2) - (p.x + p.w / 2);
    var dy = (y + h / 2) - (p.y + p.h / 2);
    var width = (w + p.w) / 2;
    var height = (h + p.h) / 2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collision = null;
    //
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = (crossWidth > (-crossHeight)) ? 'top' : 'right';
      } else {
        collision = (crossWidth > -(crossHeight)) ? 'left' : 'bottom';
      }
    }
    return collision;
  }

  handleBoundary() {
    let halfWidth = this.sprite.width / 2;
    let halfHeight = this.sprite.height / 2;

    if (this.y - halfHeight < 0) this.y = halfHeight;
    if (this.y + halfHeight > this.map.height) this.y = this.map.height - halfHeight;
    if (this.x - halfWidth < 0) this.x = halfWidth;
    if (this.x + halfWidth > this.map.width) this.x = this.map.width - halfWidth;
  }

  update(du) {

    if (keys[this.GO_LEFT])  this.x -= this.velX * du;
    if (keys[this.GO_RIGHT]) this.x += this.velX * du;

    if (keys[this.JUMP] && !this.isJumping) {
      this.velY = -11;
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
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
    this.sprite.drawBoundary(ctx, this.x - xView, this.y - yView);
  }
}
