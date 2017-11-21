class Token {

  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.w = this.sprite.width;
    this.h = this.sprite.height;
  }

  render(ctx, xView, yView) {
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
  }
}
