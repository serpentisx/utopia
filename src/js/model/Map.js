class Map {

  constructor(mapImage) {
    this.sprite = mapImage;
    this.width = this.sprite.width;
    this.height = this.sprite.height;

    this.tsize = 128;

    this.cols = Math.ceil(this.width / this.tsize); //Divide by map tile size
    this.rows = Math.ceil(this.height / this.tsize); //Divide by map tile size

    //Change this  -- we need to load all the tiles in an effective way
    this.imgArray = new Array();

    this.imgArray[0] = new Image();
    this.imgArray[0].src = 'assets/_ground/ground06.png';

    this.imgArray[1] = new Image();
    this.imgArray[1].src = 'assets/_ground/ground02.png';

    this.imgArray[2] = new Image();
    this.imgArray[2].src = 'assets/_lava/lava01.png';

    this.imgArray[3] = new Image();
    this.imgArray[3].src = 'assets/_leafy_ground/leafy_ground01.png';

    this.imgArray[4] = new Image();
    this.imgArray[4].src = 'assets/_rocky/rocky03.png';

    this.imgArray[5] = new Image();
    this.imgArray[5].src = 'assets/_water/water1.png';

    this.tiles = new Array();

    for(var i = 0; i < this.imgArray.length; i ++ ) {
      this.tiles[i] = new Sprite(this.imgArray[i]);
    }


    //Create 2D array that fills out image/map size - we will split the array to
    //represent background and foreground (this is if we want the player to
    // walk behind objects)
    this.layer = new Array(this.rows);

    for (let i = 0; i < this.layer.length; i++) {
      this.layer[i] = new Array(this.cols);
      this.layer[i].fill(0);
    }


    //Place the ground
    for (var i = 0; i < this.cols; i++) {
      this.layer[this.rows-1][i] = 1;
    }


    window.addEventListener('mousedown', this.addOrRemoveTile.bind(this));
}

  addOrRemoveTile(e) {
    let x = e.clientX - ctx.canvas.offsetLeft + this.xView;
    let y = e.clientY - ctx.canvas.offsetTop + this.yView;
    let r = this.getRow(y);
    let c = this.getCol(x);

    if(keys[KEY_1]) this.layer[r][c] = 1;
    else if(keys[KEY_2]) this.layer[r][c] = 2;
    else if(keys[KEY_3]) this.layer[r][c] = 3;
    else if(keys[KEY_4]) this.layer[r][c] = 4;
    else if(keys[KEY_5]) this.layer[r][c] = 5;
    else if(keys[KEY_6]) this.layer[r][c] = 6;
    else this.layer[r][c] = 0;
  }
  getTile(row, col) {
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
    let tile = this.getTile(row, col);

    return (tile != 0);
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
    let cameraWidth = ctx.canvas.width,
      cameraHeight = ctx.canvas.height;

    let startCol = Math.floor(xView / this.tsize);
    let endCol = startCol + (cameraWidth / this.tsize);

    //	console.log(endCol);
    let startRow = Math.floor(yView / this.tsize);
    let endRow = startRow + (cameraHeight / this.tsize);
    let offsetX = -xView + startCol * this.tsize;
    let offsetY = -yView + startRow * this.tsize;

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
        var tile = this.getTile(r, c);
        var x = (c - startCol) * this.tsize + offsetX;
        var y = (r - startRow) * this.tsize + offsetY;
        ctx.strokeRect(Math.round(x), Math.round(y), 128, 128);
        if (tile != 0) { // 0 => empty tile
          this.tiles[tile-1].drawAtCorner(ctx, x, y);
        }

      }
    }
  }
}
