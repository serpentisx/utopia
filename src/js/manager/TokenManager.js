class TokenManager {

  constructor(knight) {
    this.tokens = [];
    this.knight = knight;
    this.sprites = {};

    this.loadSprites();
    console.log(this.sprites.backpack)
  }

  loadSprites() {
    let requiredImages = {
      backpack: 'assets/model/tokens/PNG/64px/backpack.png',
      belt: 'assets/model/tokens/PNG/64px/belt.png',
      bomb: 'assets/model/tokens/PNG/64px/bomb.png',
      book: 'assets/model/tokens/PNG/64px/book.png',
      bronze_coin: 'assets/model/tokens/PNG/64px/bronze_coin.png',
      clover: 'assets/model/tokens/PNG/64px/clover.png',
      feather: 'assets/model/tokens/PNG/64px/feather.png',
      ring: 'assets/model/tokens/PNG/64px/ring.png',
      live: 'assets/itch/pngs/face_on_heart.png'
    };
    imagesPreload(requiredImages, this.sprites, this.generateTokens.bind(this));
  }


  generateTokens() {
    this.tokens.push(new Token(this.sprites.backpack, 2428, 2625));
    this.tokens.push(new Token(this.sprites.bronze_coin, 165, 3009));
    this.tokens.push(new Token(this.sprites.clover, 73, 2369));
    this.tokens.push(new Token(this.sprites.feather, 644, 1601));
    this.tokens.push(new Token(this.sprites.ring, 2064, 2241));
    this.tokens.push(new Token(this.sprites.book, 5434, 1729));
    this.tokens.push(new Token(this.sprites.bomb, 5162, 1217));
    this.tokens.push(new Token(this.sprites.live, 2376, 462, 'live'));
    this.tokens.push(new Token(this.sprites.live, 2870, 2762, 'live'));
  }

  collidesWithKnight(token) {
    let knight = {
      x: this.knight.x,
      y: this.knight.y,
      w: this.knight.sprite.width,
      h: this.knight.sprite.height
    };
    return Utils.collidesWithRectangle(knight, token);
  }

  update(du) {
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.collidesWithKnight(this.tokens[i])) {
        if (this.tokens[i].type === 'live') {
          this.knight.health.lifePoints += 1;
        }
        this.tokens.splice(i--, 1);
      }
    }
  }

  render(ctx, xView, yView) {
    this.tokens.forEach(token => token.render(ctx, xView, yView));
  }
}
