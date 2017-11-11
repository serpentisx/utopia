class KnightSprite {

  constructor() {
    this.sprites = {};
    this.width;
    this.height;

    this.numSprite = 5;
    this.walkIndex = 0;
    this.idleIndex = 0;
    this.updateRate = 0.2;

    this.loadSprites();
  }

  loadSprites() {
    let requiredImages = {
      idle0: 'assets/knight/1_IDLE_000.png',
      idle1: 'assets/knight/1_IDLE_001.png',
      idle2: 'assets/knight/1_IDLE_002.png',
      idle3: 'assets/knight/1_IDLE_003.png',
      idle4: 'assets/knight/1_IDLE_004.png',
      walk0: 'assets/knight/2_WALK_000.png',
      walk1: 'assets/knight/2_WALK_001.png',
      walk2: 'assets/knight/2_WALK_002.png',
      walk3: 'assets/knight/2_WALK_003.png',
      walk4: 'assets/knight/2_WALK_004.png',
      knight: 'assets/knight/knight.png'
    };
    imagesPreload(requiredImages, this.sprites, this.scale.bind(this));
  }

  scale() {
    for (let sprite in this.sprites) {
      this.sprites[sprite].scale = 0.25;
    }
    console.log(this.sprites)
  }

  renderWalk(ctx, x, y) {
    this.width = this.sprites.knight.width;
    this.height = this.sprites.knight.height;
    let index = Math.floor(this.walkIndex += this.updateRate) % this.numSprite;
    this.sprites[`walk${index}`].drawAtCenter(ctx, x, y);
    //console.log(index);

  }

  renderIdle(ctx, x, y) {
    this.sprites[`idle${this.walkIndex}`].drawAtCenter(ctx, x, y);
    (this.idleIndex += this.updateRate) % this.numSprite;
  }
}
