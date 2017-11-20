class KnightSprite {

  constructor(knight) {
    this.idleSprites = {};
    this.jumpSprites = {};
    this.walkSprites = {};
    this.attackSprites = {};

    this.walkIndex = 0;
    this.idleIndex = 0;
    this.jumpIndex = 0;
    this.attackIndex = 0;

    this.walkRate = 0.2;
    this.idleRate = 0.2;
    this.jumpRate = 0.2;
    this.attackRate = 1;

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

    const attackImages = {
      attackRight0: 'assets/model/character/attack/right/1.png',
      attackRight1: 'assets/model/character/attack/right/2.png',
      attackRight2: 'assets/model/character/attack/right/3.png',
      attackRight3: 'assets/model/character/attack/right/4.png',
      attackRight4: 'assets/model/character/attack/right/5.png',
      attackRight5: 'assets/model/character/attack/right/6.png',
      attackRight6: 'assets/model/character/attack/right/7.png',
      attackRight7: 'assets/model/character/attack/right/8.png',
      attackRight8: 'assets/model/character/attack/right/9.png',
      attackRight9: 'assets/model/character/attack/right/10.png',
      attackRight10: 'assets/model/character/attack/right/11.png',
      attackRight11: 'assets/model/character/attack/right/12.png',
      attackRight12: 'assets/model/character/attack/right/11.png',
      attackRight13: 'assets/model/character/attack/right/10.png',
      attackRight14: 'assets/model/character/attack/right/9.png',
      attackRight15: 'assets/model/character/attack/right/8.png',
      attackRight16: 'assets/model/character/attack/right/7.png',
      attackRight17: 'assets/model/character/attack/right/6.png',
      attackRight18: 'assets/model/character/attack/right/5.png',
      attackRight19: 'assets/model/character/attack/right/4.png',



      attackLeft0: 'assets/model/character/attack/left/1.png',
      attackLeft1: 'assets/model/character/attack/left/2.png',
      attackLeft2: 'assets/model/character/attack/left/3.png',
      attackLeft3: 'assets/model/character/attack/left/4.png',
      attackLeft4: 'assets/model/character/attack/left/5.png',
      attackLeft5: 'assets/model/character/attack/left/6.png',
      attackLeft6: 'assets/model/character/attack/left/7.png',
      attackLeft7: 'assets/model/character/attack/left/8.png',
      attackLeft8: 'assets/model/character/attack/left/9.png',
      attackLeft9: 'assets/model/character/attack/left/10.png',
      attackLeft10: 'assets/model/character/attack/left/11.png',
      attackLeft11: 'assets/model/character/attack/left/12.png',
      attackLeft12: 'assets/model/character/attack/left/12.png',
      attackLeft13: 'assets/model/character/attack/left/12.png',
      attackLeft14: 'assets/model/character/attack/left/12.png',
      attackLeft15: 'assets/model/character/attack/left/12.png',
      attackLeft16: 'assets/model/character/attack/left/12.png',
      attackLeft17: 'assets/model/character/attack/left/12.png',
      attackLeft18: 'assets/model/character/attack/left/12.png',
      attackLeft19: 'assets/model/character/attack/left/12.png'

    };

    imagesPreload(idleImages, this.idleSprites, function empty() {});
    imagesPreload(walkImages, this.walkSprites, function empty() {});
    imagesPreload(jumpImages, this.jumpSprites, function empty() {});
    imagesPreload(attackImages, this.attackSprites, function empty() {});



  }

  calculateNextIndex(type) {
    switch (type) {
      case 'idle':
        return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2);
        break;
      case 'walk':
        return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2);
        break;
      case 'jump':
        return Math.floor(this.jumpIndex += this.jumpRate) % (Object.keys(this.jumpSprites).length / 2);
        break;
      case 'attack':

        if((this.attackIndex % 20) == 0) {
          console.log(this.attackIndex);
          this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;
          this.knight.isAttacking = false;
        }
        return Math.floor(this.attackIndex += this.attackRate) % (Object.keys(this.attackSprites).length / 2);
        break;

      default:
        return 0;
        break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'idle':
        return this.idleSprites;
        break;
      case 'walk':
        return this.walkSprites;
        break;
      case 'jump':
        return this.jumpSprites;
        break;
      case 'attack':
        return this.attackSprites;
        break;

      default:
        return this.idleSprites;
        break;
    }
  }

  renderAnimation(ctx, x, y, type, direction) {
    type = type.toLowerCase();
    direction = direction.charAt(0).toUpperCase() + direction.slice(1);

    const index = this.calculateNextIndex(type);
    const sheet = this.getAnimationSprite(type);
    const sprite = sheet[`${type}${direction}${index}`];
    this.width = sprite.width;
    this.height = sprite.height;

    sprite.drawAtCenter(ctx, x, y);
  }

  render(ctx, x, y, dir, jumping, isIdle, isAttacking) {
    if (isAttacking && dir > 0) this.renderAnimation(ctx, x, y, 'attack', 'right');
    else if (isAttacking && dir < 0) this.renderAnimation(ctx, x, y, 'attack', 'left');
    else if (jumping && dir > 0) this.renderAnimation(ctx, x, y, 'jump', 'right');
    else if (jumping && dir < 0) this.renderAnimation(ctx, x, y, 'jump', 'left');
    else if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
    else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');

    else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
    else if (dir < 0) this.renderAnimation(ctx, x, y, 'walk', 'left');

    else this.renderAnimation(ctx, x, y, 'idle', 'right');
  }
}
