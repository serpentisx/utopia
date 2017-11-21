class TokenManager {

  constructor(knight) {
    this.tokens = [];
    this.hearts = [];
    this.knight = knight;
    this.sprites = {};
    this.score = 0;
    this.counterToken;
    this.hasLoaded = false;
    this.loadSprites();
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
      life: 'assets/itch/pngs/face_on_heart.png'
    };
    imagesPreload(requiredImages, this.sprites, this.generateTokens.bind(this));
  }

  generateCounterToken() {
    this.hasLoaded = true;
    return this.sprites.backpack;
  }

  generateTokens() {
    this.tokens.push(new Token(this.sprites.belt, 2428, 2625));
    this.tokens.push(new Token(this.sprites.bronze_coin, 165, 3009));
    this.tokens.push(new Token(this.sprites.clover, 73, 2369));
    this.tokens.push(new Token(this.sprites.feather, 644, 1601));
    this.tokens.push(new Token(this.sprites.ring, 2064, 2241));
    this.tokens.push(new Token(this.sprites.book, 5434, 1729));
    this.tokens.push(new Token(this.sprites.bomb, 5162, 1217));

    this.hearts.push(new Token(this.sprites.life, 2376, 462));
    this.hearts.push(new Token(this.sprites.life, 2870, 2762));

    this.counterToken = this.generateCounterToken();
  }

  hasCollectedAll() {
    if(this.tokens.length == 0) {
      return true;
    }

    return false;
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

  update() {
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.collidesWithKnight(this.tokens[i])) {
          this.score++;
          this.tokens.splice(i--, 1);

        }
      }

      for(let i = 0; i < this.hearts.length; i++) {
        if(this.collidesWithKnight(this.hearts[i])) {
          this.knight.health.lifePoints += 1;
          this.hearts.splice(i--, 1);
        }
      }
  }

  render(ctx, xView, yView) {
    if(this.hasLoaded) {
      this.tokens.forEach(token => token.render(ctx, xView, yView));
      this.hearts.forEach(token => token.render(ctx, xView, yView));
      ctx.font = '800 40px Amatic SC';
      ctx.fillStyle = '#0099cc';
      ctx.fillText(this.score + " / 7", canvas.width/2+50, 80);
      this.counterToken.drawAtCenter(ctx, canvas.width/2, 50);
      ctx.fillStyle = 'black';
    }
  }
}
