class Heart {

  constructor() {
    let ba = new Image();
    ba.src = 'assets/itch/pngs/face_on_heart.png';

    this.sprite = new Sprite(ba);


  //  this.loadSprites();
    console.log("Done loading");
    console.log(this.sprite.width);

  }

  loadSprites() {
    let requiredImages = {
      heart: 'assets/itch/pngs/face_on_heart.png'

    };
    imagesPreload(requiredImages, this.sprites, function empty() {});
  }

  render(ctx, xView, yView, noOfHearts) {

    for(var i = 0; i < noOfHearts; i++) {
        this.sprite.drawAtCenter(ctx, canvas.width-100-(i*50), 50);
    }

  }
}
