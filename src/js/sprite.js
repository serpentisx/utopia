"use strict";

class Sprite {
  constructor(image) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;

  }

  //This is for the map drawing
  drawAt(ctx, x, y, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    ctx.drawImage(this.image, x, y, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
  //Sprite
  drawAtCenter(ctx, x, y) {
    ctx.drawImage(this.image, x, y);
  }

  drawCentredAt(ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);

    ctx.drawImage(this.image,
      -w/2, -h/2);

    ctx.restore();
  }

  drawWrappedCentredAt(ctx, cx, cy, rotation) {

    let sw = canvas.width;

    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
  }

  drawWrappedVerticalCentredAt(ctx, cx, cy, rotation) {
    let sh = canvas.height;

    this.drawCentredAt(ctx, cx, cy, rotation);
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation)
  }

}
