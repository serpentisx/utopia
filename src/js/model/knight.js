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
    this.collidedCells = [];

    this.GO_LEFT = KEY_A
    this.GO_RIGHT = KEY_D
    this.JUMP = KEY_W

    this.isJumping = false;
    this.something = [];
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

    // Debugging burposes
    this.something[0] = [this.map.getCol(left), this.map.getRow(top)];
    this.something[1] = [this.map.getCol(left), this.map.getRow(bottom)];
    this.something[2] = [this.map.getCol(right), this.map.getRow(top)];
    this.something[3] = [this.map.getCol(right), this.map.getRow(bottom)];
    this.something[4] = [this.map.getCol(left), this.map.getRow(this.y)];
    this.something[5] = [this.map.getCol(right), this.map.getRow(this.y)];
    this.something[6] = [this.map.getCol(this.x), this.map.getRow(top)];
    this.something[7] = [this.map.getCol(this.x), this.map.getRow(bottom)];
  //  console.log(this.map.isSolidTileAtXY(left, top));

    // check for collision on corners
    let leftTop = this.map.isSolidTileAtXY(left, top),
      leftBottom = this.map.isSolidTileAtXY(left, bottom),
      rightTop = this.map.isSolidTileAtXY(right, top),
      rightBottom = this.map.isSolidTileAtXY(right, bottom),

      leftMiddle = this.map.isSolidTileAtXY(left, this.y),
      rightMiddle = this.map.isSolidTileAtXY(right, this.y),
      topMiddle = this.map.isSolidTileAtXY(this.x, top),
      bottomMiddle = this.map.isSolidTileAtXY(this.x, bottom);

    if (!(rightTop || rightBottom || leftTop || leftBottom ||
        topMiddle || rightMiddle || bottomMiddle || leftMiddle
      )) {
      return;
    }
    if (rightBottom || leftBottom) this.velY = 0;

    //  if(rightTop && !topMiddle && !leftTop) console.log("RIGHT");
    //  if(!rightTop && topMiddle && !leftTop) console.log("MIDDLE");
    //  if(!rightTop && !topMiddle && leftTop) console.log("LEFT");


    //Bottom collider logic

    if (topMiddle || rightTop || leftTop) {
      if (this.velY < 0) {
        //change velocity so he doesnt keep jumping, looks like he is frozen
        this.velY +=4;
        row = this.map.getRow(top);
        this.y = this.sprite.height / 2 + this.map.getY(row + 1);
      }
    }

    if (rightMiddle || leftMiddle || leftTop || rightTop) {
      if (this.dirX > 0 /*&& this.dirY >= 0*/) {
        col = this.map.getCol(right);
        // the minus one below is so that once it resets the player
        // it isnt still colliding
        this.x = -this.sprite.width / 2 + this.map.getX(col) - 1;
      } else if (this.dirX < 0 /* && this.dirY >= 0 */) {
        col = this.map.getCol(left);
        this.x = this.sprite.width / 2 + this.map.getX(col + 1);
      }
    }

    if (rightBottom || leftBottom) {
      if (this.dirY >= 0) {
        row = this.map.getRow(bottom);
        this.y = -this.sprite.height / 2 + this.map.getY(row);
      }
      if (this.yVel < 0) {
        console.log("jumping and i hit a corner");
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
    for (var i = 0; i < this.something.length; i++) {
      this.map.drawTile(this.something[i][0], this.something[i][1]);
    }
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
    this.sprite.drawBoundary(ctx, this.x - xView, this.y - yView);
    //    ctx.fillRect(this.x, this.y, 50, 50);
  }
}
