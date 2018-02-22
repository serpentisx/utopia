class Heart {

  constructor(lifePoints) {
    let heart = new Image();
    heart.src = 'assets/itch/pngs/face_on_heart.png';

    this.sprite = new Sprite(heart);
    this.lifePoints = lifePoints;

    this.startPosX = canvas.width-100;
    this.posY = 50;
    this.spritesLoaded = false;
  }

  loadSprites() {
    let requiredImages = {
      heart: 'assets/itch/pngs/face_on_heart.png'

    };
    imagesPreload(requiredImages, this.sprites, () => this.spritesLoaded = true);
  }

  depleteLifePoints() {
    this.lifePoints -= 0.03;
  }

  removeLifePoint() {
    this.lifePoints -= 1;
  }

  render(ctx) {
    if (this.spritesLoaded) {
      for(var i = 0; i < this.lifePoints; i++) {
          this.sprite.drawAtCenter(ctx, this.startPosX - (i*50), this.posY);
      }
    }
  }
}
