class Knight extends Entity {

  constructor(sprite, obj) {
    super();

    for (let prop in obj) {
      this[prop] = obj[prop];
		}
    this.sprite = sprite;
    this.rotation = 0;
    this.velX = 8;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0;
		this.gravity = 0.32;

		this.GO_LEFT = KEY_A
		this.GO_RIGHT = KEY_D
		this.JUMP = KEY_W

    this.isJumping = false;

  }

  applyGravity(du) {
    var finalVelY = this.velY + this.gravity * du;
    var avgVelY = (this.velY + finalVelY) / 2;

    var dPosY = avgVelY * du;
    //console.log("dPos " , dPosY);
    

    this.y += dPosY;
    this.velY = finalVelY;
  }

  getRadius() {
    return (this.sprite.width / 2) * 0.9;
  }

	update(du, worldWidth, worldHeight) {
		if (keys[this.GO_LEFT]) this.x -= this.velX * du;
		if (keys[this.GO_RIGHT]) this.x += this.velX * du;

		// Jump
		if (keys[this.JUMP] && !this.isJumping) {
      this.isJumping = true;
      this.velY = -10;
    }

    //console.log(this.y);

    //Always update gravity
    this.applyGravity(du);

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
      this.isJumping = false; // might want to change this later
    }
  }

  render(ctx, xView, yView) {
      this.sprite.drawAtCenter(ctx, (this.x-this.sprite.width/2) - xView, (this.y-this.sprite.height/2) - yView);
  }
}
