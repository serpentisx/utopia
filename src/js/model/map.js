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
    for (var i = 0; i < this.layer.length; i++) {
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
    this.layer[7][22] = 1;
    this.layer[7][23] = 1;
    this.layer[6][24] = 1;
    this.layer[5][25] = 1;




    this.layer[7][43] = 1;
    this.layer[7][34] = 1;
    this.layer[8][33] = 1;

    ////////////////////////////////////////////
  }

  getTile(col, row) {
    return this.layer[row][col];
  }

  isSolidTileAtXY(x, y) {
    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    var tile = this.getTile(col, row);

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


  render(ctx, xView, yView) {
    //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
    var sx, sy, dx, dy;
    var sWidth, sHeight, dWidth, dHeight;

    // Offset point to crop image
    sx = xView;
    sy = yView;

    // dimensions of cropped image
    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;

    //Check if cropped image is smaller than canvas
    if (this.sprite.width - sx < sWidth) {
      sWidth = this.sprite.width - sx;
    }

    if (this.sprite.height - sy < sHeight) {
      sHeight = this.sprite.height - sy;
    }

    // location on canvas to draw the cropped image
    dx = 0;
    dy = 0;

    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    this.sprite.drawAt(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    this.drawGrid(ctx, xView, yView);
  }



  drawGrid(ctx, xView, yView) {
    // dimensions of cropped image
    var cameraWidth = ctx.canvas.width;
    var cameraHeight = ctx.canvas.height;

    //I should have about 6 x 10 tiles for a full screen
    //  console.log("Row estimate " + cameraHeight / 128);
    //  console.log("Col estimate " + cameraWidth / 128);

    var startCol = Math.floor(xView / this.tsize);
    //console.log(startCol);
    var endCol = startCol + (cameraWidth / this.tsize);

    //	console.log(endCol);
    var startRow = Math.floor(yView / this.tsize);
    var endRow = startRow + (cameraHeight / this.tsize);
    var offsetX = -xView + startCol * this.tsize;
    var offsetY = -yView + startRow * this.tsize;
    for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
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
