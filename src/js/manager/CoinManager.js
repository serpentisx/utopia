class CoinManager {

  constructor(knight) {
    this.coins = [];
    this.knight = knight;

    this.generateCoins();
    this.counterCoin = this.generateCounterCoin();

    this.score = 0;
  }

  generateCounterCoin() {
    let counterCoin = new Image();
    counterCoin.src = 'assets/model/coin/Gold_counter.png';
    return new Sprite(counterCoin);
  }

  generateCoins() {
    this.coins.push(new Coin(2388, 200));
    this.coins.push(new Coin(1345, 193));
  }

  collidesWithKnight(coin) {
    let knight = {
      x: this.knight.x,
      y: this.knight.y,
      w: this.knight.sprite.width,
      h: this.knight.sprite.height
    };
    return Utils.collidesWithRectangle(knight, coin);
  }

  update(du) {
    for (let i = 0; i < this.coins.length; i++) {
      if (this.collidesWithKnight(this.coins[i])) {
        this.coins.splice(i--, 1);
        this.score++;
      }
    }
  }

  render(ctx, xView, yView) {
    this.coins.forEach(coin => coin.render(ctx, xView, yView));
    ctx.font = '800 40px Amatic SC';
    ctx.fillStyle = '#0099cc';
    ctx.fillText(this.score, 100, 80);
    this.counterCoin.drawAtCenter(ctx, 50, 50);
    ctx.fillStyle = 'black';
  }
}
