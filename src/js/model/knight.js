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
    // Get coordinates
    let left = this.x - this.sprite.width / 2,
        right = this.x + this.sprite.width / 2,
        top = this.y - this.sprite.height / 2,
        bottom = this.y + this.sprite.height / 2;

    // Debugging purposes
    this.something[0] = [this.map.getCol(left), this.map.getRow(top)];
    this.something[1] = [this.map.getCol(left), this.map.getRow(bottom)];
    this.something[2] = [this.map.getCol(right), this.map.getRow(top)];
    this.something[3] = [this.map.getCol(right), this.map.getRow(bottom)];
    this.something[4] = [this.map.getCol(left), this.map.getRow(this.y)];
    this.something[5] = [this.map.getCol(right), this.map.getRow(this.y)];
    this.something[6] = [this.map.getCol(this.x), this.map.getRow(top)];
    this.something[7] = [this.map.getCol(this.x), this.map.getRow(bottom)];


    /***** VERTICAL MOVEMENT ******/
    // CHECK BOTTOM-LEFT OR BOTTOM-RIGHT
    if(this.dirY >= 0) {
      if(this.map.isSolidTileAtXY(left, bottom) || this.map.isSolidTileAtXY(right, bottom)){
        row = this.map.getRow(bottom);
        this.y = -this.sprite.height / 2 + this.map.getY(row);
        this.velY = 0;
      }
    } else if(this.dirY < 0) {
      // CHECK TOP-LEFT OR TOP-RIGHT
      if (this.map.isSolidTileAtXY(left, top) || this.map.isSolidTileAtXY(right, top)) {
        //change velocity so he doesnt keep jumping, looks like he is frozen
        this.velY +=4;
        row = this.map.getRow(top);
        this.y = this.sprite.height / 2 + this.map.getY(row + 1);
      }
    }
    /***** HORIZONTAL MOVEMENT******/
    if(this.dirX > 0) {
      // CHECK RIGHT-MIDDLE OR TOP RIGHT
      if(this.map.isSolidTileAtXY(right, this.y) || this.map.isSolidTileAtXY(right, top)){
        col = this.map.getCol(right);
        // the minus one below is so that once it resets the player
        // it isnt still colliding
        this.x = -this.sprite.width / 2 + this.map.getX(col) - 1;
      }
    } else if(this.dirX < 0){
      // CHECK LEFT-MIDDLE OR TOP LEFT
      if(this.map.isSolidTileAtXY(left, this.y) || this.map.isSolidTileAtXY(left, top)){
        col = this.map.getCol(left);
        this.x = this.sprite.width / 2 + this.map.getX(col + 1);
    }
  }
}

  update(du) {
    var worldWidth = this.map.width;
    var worldHeight = this.map.height;
    if (keys[this.GO_LEFT] && (this.x > this.sprite.width/2)) {
      this.x -= this.velX * du;
      this.dirX = -this.velX;
    } else if (keys[this.GO_RIGHT] && (this.x < worldWidth - this.sprite.width/2)) {
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

    if (this.y - this.sprite.height / 2 < 0) {
      this.y = this.sprite.height / 2;
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
