class Heart {

  constructor(lifePoints) {
    let heart = new Image();
    heart.src = 'assets/itch/pngs/face_on_heart.png';

    this.sprite = new Sprite(heart);
    this.lifePoints = lifePoints;

    this.startPosX = canvas.width-100;
    this.posY = 50;
  }

  loadSprites() {
    let requiredImages = {
      heart: 'assets/itch/pngs/face_on_heart.png'

    };
    imagesPreload(requiredImages, this.sprites, function empty() {});
  }

  depleteLifePoints() {
    this.lifePoints -= 0.03;

  }

  render(ctx) {
    for(var i = 0; i < this.lifePoints; i++) {
        this.sprite.drawAtCenter(ctx, this.startPosX - (i*50), this.posY);
    }
  }
}
