"use strict";

function Sprite(image) {
  this.image = image;

  this.width = image.width;
  this.height = image.height;
  this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
  ctx.drawImage(this.image,
    x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
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
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
  let sw = g_canvas.width;

  this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
  this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
  this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {
  let sh = g_canvas.height;

  this.drawCentredAt(ctx, cx, cy, rotation);
  this.drawCentredAt(ctx, cx, cy - sh, rotation);
  this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
