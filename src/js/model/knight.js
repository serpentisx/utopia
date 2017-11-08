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
    this.dirX = 0;
    this.dirY = 0;

    this.GO_LEFT = KEY_A
    this.GO_RIGHT = KEY_D
    this.JUMP = KEY_W

    this.isJumping = false;

  }

  setMap(map) {
    this.map = map;
  }

  applyGravity(du) {
    let finalVelY = this.velY + this.gravity * du,
      avgVelY = (this.velY + finalVelY) / 2,
      dPosY = avgVelY * du;

    this.dirY = dPosY;

    this.y += dPosY;
    this.velY = finalVelY;
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  //Could put this in entities
  handleCollision(du) {

    let row, col;

    let left = this.x - this.sprite.width / 2,
      right = this.x + this.sprite.width / 2,
      top = this.y - this.sprite.height / 2,
      bottom = this.y + this.sprite.height / 2;


    // check for collision on corners
    let leftTop = this.map.isSolidTileAtXY(left, top),
      leftBottom = this.map.isSolidTileAtXY(left, bottom),
      rightTop = this.map.isSolidTileAtXY(right, top),
      rightBottom = this.map.isSolidTileAtXY(right, bottom),

      // check for collisions on sprite sides
      leftMiddle = this.map.isSolidTileAtXY(left, this.y),
      rightMiddle = this.map.isSolidTileAtXY(right, this.y),
      topMiddle = this.map.isSolidTileAtXY(top, this.x),
      bottomMiddle = this.map.isSolidTileAtXY(bottom, this.x);

    if (!(rightMiddle || rightBottom || leftMiddle || leftBottom)) {
      return;
    }

    if (rightBottom || leftBottom) this.velY = 0;

    console.log("leftTop " + leftTop);
    // console.log("rightMiddle " + rightMiddle);
    // console.log("bottomMiddle " + bottomMiddle);
    // console.log("topMiddle " + topMiddle);

    if (rightBottom || leftBottom || topMiddle) {
      if (this.dirY > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.sprite.height / 2 + this.map.getY(row);
      } else if (this.dirY < 0) {
        row = this.map.getRow(top);
        this.y = this.sprite.height / 2 + this.map.getY(row + 1);
      }
    }

    if (rightMiddle || leftMiddle || leftTop || rightTop) {
      if (this.dirX > 0) {
        col = this.map.getCol(right);
        this.x = -this.sprite.width / 2 + this.map.getX(col);
      } else if (this.dirX < 0) {
        col = this.map.getCol(left);
        this.x = this.sprite.width / 2 + this.map.getX(col + 1);
      }
    }

    /*
   if (this.dirY > 0) {
       row = this.map.getRow(bottom);
       this.y = -this.sprite.height / 2 + this.map.getY(row);
   }
   else if (this.dirY < 0) {
       row = this.map.getRow(top);
       this.y = this.sprite.height / 2 + this.map.getY(row + 1);
   }
  else if (this.dirX > 0) {
       col = this.map.getCol(right);
       this.x = -this.sprite.width / 2 + this.map.getX(col);
   }
   else if (this.dirX < 0) {
       col = this.map.getCol(left);
       this.x = this.sprite.width / 2 + this.map.getX(col + 1);
   } */

  }

  update(du) {
    var worldWidth = this.map.width;
    var worldHeight = this.map.height;
    if (keys[this.GO_LEFT]) {
      this.x -= this.velX * du;
      this.dirX = -this.velX;
    } else if (keys[this.GO_RIGHT]) {
      this.x += this.velX * du;
      this.dirX = this.velX;
    } else this.dirX = 0;

    //Always update gravity
    this.applyGravity(du);

    this.handleCollision(du);

    // Jump
    if (keys[this.JUMP] && !this.isJumping) {
      this.isJumping = true;
      this.velY = -10;
    }

    // don't let player leaves the world's boundary
    if (this.x - this.sprite.width / 2 < 0) {
      this.x = this.sprite.width / 2;
    }
    if (this.y - this.sprite.height / 2 < 0) {
      this.y = this.sprite.height / 2;
    }
    if (this.x + this.sprite.width / 2 > worldWidth) {
      this.x = worldWidth - this.sprite.width / 2;
    }
    if (this.y + this.sprite.height / 2 > worldHeight) {
      this.y = worldHeight - this.sprite.height / 2;
    }

    if (this.velY === 0) {
      this.isJumping = false; // might want to change this later
    }
  }

  render(ctx, xView, yView) {
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
    this.sprite.drawBoundary(ctx, this.x - xView, this.y - yView);
    //    ctx.fillRect(this.x, this.y, 50, 50);
  }
}
