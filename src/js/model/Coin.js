class Coin {

  constructor(x, y) {
    this.sprites = {};

    this.x = x;
    this.y = y;
    this.width;
    this.height;

    this.numSprite = 10;
    this.index = 0;
    this.updateRate = 0.2;

    this.loadSprites();
  }

  loadSprites() {
    let requiredImages = {
      coin0: 'assets/model/coin/Gold_0.png',
      coin1: 'assets/model/coin/Gold_1.png',
      coin2: 'assets/model/coin/Gold_2.png',
      coin3: 'assets/model/coin/Gold_3.png',
      coin4: 'assets/model/coin/Gold_4.png',
      coin5: 'assets/model/coin/Gold_5.png',
      coin6: 'assets/model/coin/Gold_6.png',
      coin7: 'assets/model/coin/Gold_7.png',
      coin8: 'assets/model/coin/Gold_8.png',
      coin9: 'assets/model/coin/Gold_9.png'
    };
    imagesPreload(requiredImages, this.sprites, function empty() {});
  }

  render(ctx, xView, yView) {
    let index = Math.floor(this.index += this.updateRate) % this.numSprite;
    this.width = this.sprites[`coin${index}`].width;
    this.height = this.sprites[`coin${index}`].height;
    this.sprites[`coin${index}`].drawAtCenter(ctx, this.x - xView, this.y - yView);
  }
}
