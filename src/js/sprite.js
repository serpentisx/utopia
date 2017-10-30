"use strict";
class Sprite {
  constructor(image, x, y, rotation) {
    this.image = image
    this.x = x
    this.y = y
    this.rotation

    this.width = image.width;
    this.height = image.height;
    this.scale = 1;
  }
  drawAt() {
    ctx.drawImage(this.image,x, y);
  }
  drawCentredAt() {
    if (rotation === undefined) rotation = 0;

    let w = this.width,
      h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);

    ctx.drawImage(this.image,
      -w / 2, -h / 2);

    ctx.restore();
  }
  drawWrappedCentredAt() {
    let sw = g_canvas.width;

    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
  }

  drawWrappedVerticalCentredAt() {
    let sh = g_canvas.height;

    this.drawCentredAt(ctx, cx, cy, rotation);
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
  }
}
