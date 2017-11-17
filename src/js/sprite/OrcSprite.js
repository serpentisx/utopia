class OrcSprite {

  constructor() {
    this.walkSprites = {};
    this.idleSprites = {};
    this.jumpSprites = {};

    this.jumpIndex = 0;
    this.walkIndex = 0;
    this.idleIndex = 0;

    this.walkRate = 0.08;
    this.jumpRate = 0.08;
    this.idleRate = 0.08;

    this.width = 100;
    this.height = 100;

    this.loadSprites();
  }

  loadSprites() {
    const idleSprites = {
      idleRight0: 'assets/model/ork/right/IDLE_000.png',
      idleRight1: 'assets/model/ork/right/IDLE_001.png',
      idleRight2: 'assets/model/ork/right/IDLE_002.png',
      idleRight3: 'assets/model/ork/right/IDLE_003.png',
      idleRight4: 'assets/model/ork/right/IDLE_004.png',
      idleRight5: 'assets/model/ork/right/IDLE_005.png',

      idleLeft0: 'assets/model/ork/left/IDLE_000.png',
      idleLeft1: 'assets/model/ork/left/IDLE_001.png',
      idleLeft2: 'assets/model/ork/left/IDLE_002.png',
      idleLeft3: 'assets/model/ork/left/IDLE_003.png',
      idleLeft4: 'assets/model/ork/left/IDLE_004.png',
      idleLeft5: 'assets/model/ork/left/IDLE_005.png'
    };

    const walkSprites = {
      walkRight0: 'assets/model/ork/right/WALK_000.png',
      walkRight1: 'assets/model/ork/right/WALK_001.png',
      walkRight2: 'assets/model/ork/right/WALK_002.png',
      walkRight3: 'assets/model/ork/right/WALK_003.png',
      walkRight4: 'assets/model/ork/right/WALK_004.png',
      walkRight5: 'assets/model/ork/right/WALK_005.png',
      walkRight6: 'assets/model/ork/right/WALK_006.png',

      walkLeft0: 'assets/model/ork/left/WALK_000.png',
      walkLeft1: 'assets/model/ork/left/WALK_001.png',
      walkLeft2: 'assets/model/ork/left/WALK_002.png',
      walkLeft3: 'assets/model/ork/left/WALK_003.png',
      walkLeft4: 'assets/model/ork/left/WALK_004.png',
      walkLeft5: 'assets/model/ork/left/WALK_005.png',
      walkLeft6: 'assets/model/ork/left/WALK_006.png'
    };

    const jumpSprites = {
      jumpRight0: 'assets/model/ork/right/JUMP_000.png',
      jumpRight1: 'assets/model/ork/right/JUMP_001.png',
      jumpRight2: 'assets/model/ork/right/JUMP_002.png',
      jumpRight3: 'assets/model/ork/right/JUMP_003.png',
      jumpRight4: 'assets/model/ork/right/JUMP_004.png',
      jumpRight5: 'assets/model/ork/right/JUMP_005.png',
      jumpRight6: 'assets/model/ork/right/JUMP_006.png',

      jumpLeft0: 'assets/model/ork/left/JUMP_000.png',
      jumpLeft1: 'assets/model/ork/left/JUMP_001.png',
      jumpLeft2: 'assets/model/ork/left/JUMP_002.png',
      jumpLeft3: 'assets/model/ork/left/JUMP_003.png',
      jumpLeft4: 'assets/model/ork/left/JUMP_004.png',
      jumpLeft5: 'assets/model/ork/left/JUMP_005.png',
      jumpLeft6: 'assets/model/ork/left/JUMP_006.png'
    };

    imagesPreload(idleSprites, this.idleSprites, function empty() {});
    imagesPreload(walkSprites, this.walkSprites, function empty() {});
    imagesPreload(jumpSprites, this.jumpSprites, function empty() {});
  }

  calculateNextIndex(type) {
    switch (type) {
      case 'walk'   : return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2); break;
      case 'idle'   : return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2); break;
      case 'jump'   : return Math.floor(this.jumpIndex += this.jumpRate) % (Object.keys(this.jumpSprites).length / 2); break;
      default: return 0; break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'walk'   : return this.walkSprites;   break;
      case 'idle'   : return this.idleSprites;   break;
      case 'jump'   : return this.jumpSprites;   break;
      default: return this.idleSprites; break;
    }
  }

  renderAnimation(ctx, x, y, type, direction) {
    type = type.toLowerCase();
    direction =  direction.charAt(0).toUpperCase() + direction.slice(1);

    const index = this.calculateNextIndex(type);
    const sprites = this.getAnimationSprite(type);

    sprites[`${type}${direction}${index}`].drawAtCenter(ctx, x, y);
  }

  render(ctx, x, y, dir, attacking, isIdle, isjump) {
    // if (isJump && dir > 0) this.renderAnimation(ctx, x, y, 'jump', 'right');
    // else if (isJump && dir < 0) this.renderAnimation(ctx, x, y, 'jump', 'left');
    if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
    else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');
    else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
    else if (dir < 0)this.renderAnimation(ctx, x, y, 'walk', 'left');

    else this.renderAnimation(ctx, x, y, 'idle', 'right');
  }


}
