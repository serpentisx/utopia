class Knight extends Entity {

  constructor(sprite, obj) {
    super();

    for (let prop in obj) {
      this[prop] = obj[prop];
    }

    this.sprite = sprite;
    this.rotation = 0;
    this.velX = 8;
    this.velY = 8;
    this.accelX = 0;
    this.accelY = 0;

    this.kc = new KeyController();
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  update(du) {
    if (this.kc.isPressing('A')) this.x -= this.velX * du;
    if (this.kc.isPressing('W')) this.y -= this.velY * du;
    if (this.kc.isPressing('D')) this.x += this.velX * du;
    if (this.kc.isPressing('S')) this.y += this.velY * du;
  }

  render(ctx) {
    this.sprite.drawWrappedCentredAt(ctx, this.x, this.y, this.rotation);
  }
}
