class Map {

  constructor(mapImage) {
    this.sprite = mapImage;
    this.width = this.sprite.width;
    this.height = this.sprite.height;

    //Change this  -- we need to load all the tiles in an effective way
    this.brick = new Image();
    this.brick.src = 'assets/_ground/ground07.png';
    this.tile = new Sprite(this.brick);
    ///
    //tile size
    this.tsize = 128;

    this.cols = Math.floor(this.width / this.tsize); //Divide by map tile size
    this.rows = Math.floor(this.height / this.tsize); //Divide by map tile size

    //Create 2D array that fills out image/map size - we will split the array to
    //represent background and foreground (this is if we want the player to
    // walk behind objects)
    this.layer = new Array(this.cols + 1);
    for (let i = 0; i < this.layer.length; i++) {
      this.layer[i] = new Array(this.rows + 1);
    }

    //Place the ground
    for (var i = 0; i < this.layer.length; i++) {
      this.layer[this.rows][i] = 1;

    }

    //Place random bricks

    this.layer[2][7] = 1;
    this.layer[9][6] = 1;
    this.layer[5][6] = 1;
    this.layer[4][7] = 1;
    this.layer[3][6] = 1;
    this.layer[4][6] = 1;
    this.layer[7][22] = 1;
    this.layer[7][23] = 1;
    this.layer[6][24] = 1;
    this.layer[4][25] = 1;
    this.layer[5][25] = 1;
    this.layer[7][28] = 1;
    this.layer[6][27] = 1;
    this.layer[6][26] = 1;

    this.layer[7][43] = 1;
    this.layer[7][34] = 1;
    this.layer[8][33] = 1;
  }

  getTile(col, row) {
    return this.layer[row][col];
  }

  // this function can be optimized, we don't need to check that much
  getRectTiles(x, y) {
    var row = Math.max(0, this.getRow(y) - 3);
    var col = Math.max(0, this.getCol(x) - 3);

    var tiles = [];
    for (var i = row; i <= row + 4; i++) {
      for( var k = col; k <= col + 4; k++) {
        if (this.layer[i][k] !== undefined) {
          tiles.push({
            y: i * this.tsize,
            x: k * this.tsize,
            w: this.tsize,
            h: this.tsize
          });
        }
      }
    }
    return tiles;
  }

  isSolidTileAtXY(x, y) {
    let col = Math.floor(x / this.tsize);
    let row = Math.floor(y / this.tsize);
    let tile = this.getTile(col, row);

    return (tile === 1);
  }

  getCol(x) {
    return Math.floor(x / this.tsize);
  }

  getRow(y) {
    return Math.floor(y / this.tsize);
  }

  getX(col) {
    return col * this.tsize;
  }

  getY(row) {
    return row * this.tsize;
  }

  drawTile(x, y) {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.strokeRect(x - this.xView, y - this.yView, 128, 128);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
  }

  render(ctx, xView, yView) {
    //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);

    let sx, sy, dx, dy,
      sWidth, sHeight, dWidth, dHeight;

    // Offset point to crop image
    this.xView = xView;
    this.yView = yView;

    // dimensions of cropped image
    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;

    //Check if cropped image is smaller than canvas
    if (this.sprite.width - this.xView < sWidth) {
      sWidth = this.sprite.width - this.xView;
    }

    if (this.sprite.height - this.yView < sHeight) {
      sHeight = this.sprite.height - this.yView;
    }

    // location on canvas to draw the cropped image
    dx = 0;
    dy = 0;

    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    this.sprite.drawAt(ctx, this.xView, this.yView, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.drawGrid(ctx, this.xView, this.yView);
  }

  drawGrid(ctx, xView, yView) {
    // dimensions of cropped image
    let cameraWidth = ctx.canvas.width + 300,
      cameraHeight = ctx.canvas.height + 300;

    //I should have about 6 x 10 tiles for a full screen
    //  console.log("Row estimate " + cameraHeight / 128);
    //  console.log("Col estimate " + cameraWidth / 128);

    let startCol = Math.floor(xView / this.tsize);
    let endCol = startCol + (cameraWidth / this.tsize);

    //	console.log(endCol);
    let startRow = Math.floor(yView / this.tsize);
    let endRow = startRow + (cameraHeight / this.tsize);
    let offsetX = -xView + startCol * this.tsize;
    let offsetY = -yView + startRow * this.tsize;
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        var tile = this.getTile(c, r);
        var x = (c - startCol) * this.tsize + offsetX;
        var y = (r - startRow) * this.tsize + offsetY;
        ctx.strokeRect(Math.round(x), Math.round(y), 128, 128);
        if (tile == 1) { // 0 => empty tile
          this.tile.drawAtCorner(ctx, x, y);
        }

      }
    }
  }
}
