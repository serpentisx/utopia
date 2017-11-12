class KnightSprite {

  constructor() {
    this.idleSprites = {};
    this.jumpSprites = {};
    this.walkSprites = {};

    this.walkIndex = 0;
    this.idleIndex = 0;
    this.jumpIndex = 0;

    this.walkRate = 0.2;
    this.idleRate = 0.2;
    this.jumpRate = 0.2;

    this.loadSprites();
  }

  loadSprites() {

    const idleImages = {
      idleRight0: 'assets/model/character/idle/right/1.png',
      idleRight1: 'assets/model/character/idle/right/2.png',
      idleRight2: 'assets/model/character/idle/right/3.png',
      idleRight3: 'assets/model/character/idle/right/4.png',
      idleRight4: 'assets/model/character/idle/right/5.png',
      idleRight5: 'assets/model/character/idle/right/6.png',

      idleLeft0: 'assets/model/character/idle/left/1_.png',
      idleLeft1: 'assets/model/character/idle/left/2_.png',
      idleLeft2: 'assets/model/character/idle/left/3_.png',
      idleLeft3: 'assets/model/character/idle/left/4_.png',
      idleLeft4: 'assets/model/character/idle/left/5_.png',
      idleLeft5: 'assets/model/character/idle/left/6_.png'
    };

    const walkImages = {
      walkRight0: 'assets/model/character/walk/right/1.png',
      walkRight1: 'assets/model/character/walk/right/2.png',
      walkRight2: 'assets/model/character/walk/right/3.png',
      walkRight3: 'assets/model/character/walk/right/4.png',
      walkRight4: 'assets/model/character/walk/right/5.png',
      walkRight5: 'assets/model/character/walk/right/6.png',

      walkLeft0: 'assets/model/character/walk/left/1_.png',
      walkLeft1: 'assets/model/character/walk/left/2_.png',
      walkLeft2: 'assets/model/character/walk/left/3_.png',
      walkLeft3: 'assets/model/character/walk/left/4_.png',
      walkLeft4: 'assets/model/character/walk/left/5_.png',
      walkLeft5: 'assets/model/character/walk/left/6_.png'
    };

    const jumpImages = {
      jumpRight0: 'assets/model/character/jump/right/1.png',
      jumpRight1: 'assets/model/character/jump/right/2.png',
      jumpRight2: 'assets/model/character/jump/right/3.png',
      jumpRight3: 'assets/model/character/jump/right/4.png',

      jumpLeft0: 'assets/model/character/jump/left/1_.png',
      jumpLeft1: 'assets/model/character/jump/left/2_.png',
      jumpLeft2: 'assets/model/character/jump/left/3_.png',
      jumpLeft3: 'assets/model/character/jump/left/4_.png'
    };
    imagesPreload(idleImages, this.idleSprites, function empty() {});
    imagesPreload(walkImages, this.walkSprites, function empty() {});
    imagesPreload(jumpImages, this.jumpSprites, function empty() {});
  }

  calculateNextIndex(type) {
    switch (type) {
      case 'idle' : return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2); break;
      case 'walk' : return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2); break;
      case 'jump' : return Math.floor(this.jumpIndex += this.jumpRate) % (Object.keys(this.jumpSprites).length / 2); break;

      default: return 0; break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'idle' : return this.idleSprites; break;
      case 'walk' : return this.walkSprites; break;
      case 'jump' : return this.jumpSprites; break;

      default: return this.idleSprites; break;
    }
  }

  renderAnimation(ctx, x, y, type, direction) {
    type = type.toLowerCase();
    direction =  direction.charAt(0).toUpperCase() + direction.slice(1);

    const index = this.calculateNextIndex(type);
    const sheet = this.getAnimationSprite(type);
    const sprite = sheet[`${type}${direction}${index}`];

    this.width = sprite.width;
    this.height = sprite.height;

    sprite.drawAtCenter(ctx, x, y);
  }

  render(ctx, x, y, dir, jumping, isIdle) {
    if (jumping && dir > 0) this.renderAnimation(ctx, x, y, 'jump', 'right');
    else if (jumping && dir < 0) this.renderAnimation(ctx, x, y, 'jump', 'left');
    else if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
    else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');
    else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
    else if (dir < 0)this.renderAnimation(ctx, x, y, 'walk', 'left');

    else this.renderAnimation(ctx, x, y, 'idle', 'right');
  }
}
