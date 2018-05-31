class Heart {

  constructor(lifePoints) {
    this.sprite = {};
    this.lifePoints = lifePoints;
    
    this.posY = 50;
    this.spritesLoaded = false;
    this.loadSprites();
  }

  loadSprites() {
    let requiredImages = {
      heart: 'assets/itch/pngs/face_on_heart.png'
    };
    imagesPreload(requiredImages, this.sprite, () => this.spritesLoaded = true);
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
        this.sprite.heart.drawAtCenter(ctx, window.innerWidth - 100 - (i*50), this.posY);
      }
    }
  }
}
