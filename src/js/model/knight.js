class Knight extends Entity {

  constructor(sprite, obj) {
    super();

    for (let prop in obj) {
      this[prop] = obj[prop];
    }
    this.sprite = sprite;
    this.rotation = 0;
    this.velX = 20;
    this.velY = 20;
    this.accelX = 0;
    this.accelY = 0;

    this.kc = new KeyController();

  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

  update(du, worldWidth, worldHeight) {
    if (this.kc.isPressing('A')) this.x -= this.velX * du;
    // Jump
    if (this.kc.eatKey('W')) this.y -= this.velY * du;
    if (this.kc.isPressing('D')) this.x += this.velX * du;
    // Should not be able to move down
    //if (this.kc.isPressing('S')) this.y += this.velY * du;

    //Always update gravity 
    this.y += gravity; 
      
    // don't let player leaves the world's boundary
      if(this.x - this.sprite.width/2 < 0){
        this.x = this.sprite.width/2;
      }
      if(this.y - this.sprite.height/2 < 0){
        this.y = this.sprite.height/2;
      }
      if(this.x + this.sprite.width/2 > worldWidth){
        this.x = worldWidth - this.sprite.width/2;
      }
      if(this.y + this.sprite.height/2 > worldHeight){
        this.y = worldHeight - this.sprite.height/2;
      }

  }

  render(ctx, xView, yView) {
      this.sprite.drawAtCenter(ctx, (this.x-this.sprite.width/2) - xView, (this.y-this.sprite.height/2) - yView);
  }
}
