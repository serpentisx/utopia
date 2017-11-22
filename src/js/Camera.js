class Camera {

  constructor(xView, yView, canvasWidth, canvasHeight) {
    this.AXIS = {
      NONE: "none",
      HORIZONTAL: "horizontal",
      VERTICAL: "vertical",
      BOTH: "both"
    };

    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    this.yView = yView || 0;

    // distance from followed object to border before camera starts to move
    this.xDeadZone = 0; // min distance to horizontal borders
    this.yDeadZone = 0; // min distance to vertical borders


    // viewport dimensions
    this.wView = canvasWidth;
    this.hView = canvasHeight;

    // Allow both vertical and horizontal movement
    this.axis = this.AXIS.BOTH;

    // object that should be followed
    this.followed = null;

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    window.addEventListener('resize', this.resetDimensionsToCanvas.bind(this));
    window.addEventListener('click', this.getCord.bind(this));
  }

  setWorldDimensions(worldWidth, worldHeight) {
    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  resetDimensions(canvasWidth, canvasHeight) {
    this.wView = canvasWidth;
    this.hView = canvasHeight;
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);
    this.xDeadZone = canvasWidth / 2;
    this.yDeadZone = canvasHeight / 2;
  }

  resetDimensionsToCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    this.resetDimensions(ctx.canvas.width, ctx.canvas.height);
  }

  follow(player, xDeadZone, yDeadZone) {
    this.followed = player;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  getCord(e) {
    var x = e.clientX - ctx.canvas.offsetLeft + this.xView;
    var y = e.clientY - ctx.canvas.offsetTop + this.yView;
    // console.log("x: " + x + "  y: " + y);
  }

  update() {

    // keep following the player (or other desired object)
    if (this.followed != null) {
      if (this.axis == this.AXIS.HORIZONTAL || this.axis == this.AXIS.BOTH) {
        // moves camera on horizontal axis based on followed object position
        if (this.followed.x - this.xView + this.xDeadZone > this.wView)
          this.xView = this.followed.x - (this.wView - this.xDeadZone);
        else if (this.followed.x - this.xDeadZone < this.xView)
          this.xView = this.followed.x - this.xDeadZone;

      }
      if (this.axis == this.AXIS.VERTICAL || this.axis == this.AXIS.BOTH) {
        // moves camera on vertical axis based on followed object position
        if (this.followed.y - this.yView + this.yDeadZone > this.hView)
          this.yView = this.followed.y - (this.hView - this.yDeadZone);
        else if (this.followed.y - this.yDeadZone < this.yView)
          this.yView = this.followed.y - this.yDeadZone;
      }

    }

    // update viewportRect
    this.viewportRect.set(this.xView, this.yView);

    // don't let camera leaves the world's boundary
    if (!this.viewportRect.within(this.worldRect)) {
      if (this.viewportRect.left < this.worldRect.left)
        this.xView = this.worldRect.left;
      if (this.viewportRect.top < this.worldRect.top)
        this.yView = this.worldRect.top;
      if (this.viewportRect.right > this.worldRect.right)
        this.xView = this.worldRect.right - this.wView;
      if (this.viewportRect.bottom > this.worldRect.bottom)
        this.yView = this.worldRect.bottom - this.hView;
    }
  }
}