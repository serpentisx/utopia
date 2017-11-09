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

    this.layer[7][43] = 1;
    this.layer[7][34] = 1;
    this.layer[8][33] = 1;

    ////////////////////////////////////////////

    this.flagged = []
  }

  getTile(col, row) {
    return this.layer[row][col];
  }

  isSolidTileAtXY(x, y) {
    let col = Math.floor(x / this.tsize);
    let row = Math.floor(y / this.tsize);

    let tile = this.getTile(col, row);
//Delete below
    if(tile == 1) {
      this.flagged.push([row, col]);
    }
//
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
    ctx.fillRect(this.getCol(x), this.getRow(y), 128, 128);

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
    //console.log(startCol);
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


        ctx.strokeStyle = "green";
    //    console.log("start iteration");
        for (var i = this.flagged.length - 1; i >= 0; i--) {
        // Draw something here
        var col = this.flagged[i][1];
        var row = this.flagged[i][0];

    //    this.drawTile(col, row, xView, yView);
      //  this.paintTileWithCoordinates(this.flagged[i][0], this.flagged[i][1], xView, yView);
      //  console.log("Removing " + this.flagged[i][0] + " x " + this.flagged[i][1])
        this.flagged.splice(i, 1);
      }
      //  console.log("done");
        //console.log("Array should be clear : " + this.flagged);
      //
        ctx.strokeStyle = "black";







/*
        ctx.strokeStyle = "green";
        console.log("start iteration");
        for (var i = this.flagged.length - 1; i >= 0; i--) {
        // Draw something here
        ctx.fillRect(this.flagged[i][1]*128-sWidth, this.flagged[i][0]*128-sHeight, 128, 128);
        console.log("Removing " + this.flagged[i][0] + " x " + this.flagged[i][1])
            this.flagged.splice(i, 1);
    }
        console.log("done");
        console.log("Array should be clear : " + this.flagged);
    //
        ctx.strokeStyle = "black";*/
  }
}
