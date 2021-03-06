class OrcSprite {

  constructor(orc) {
    this.walkSprites = {};
    this.idleSprites = {};
    this.jumpSprites = {};
    this.attackSprites = {};
    this.deadSprites = {};

    this.jumpIndex = 0;
    this.walkIndex = 0;
    this.idleIndex = 0;
    this.attackIndex = 0;
    this.deadIndex = 0;

    this.walkRate = 0.08;
    this.jumpRate = 0.08;
    this.idleRate = 0.08;
    this.attackRate = 0.2;
    this.deadRate = 0.08;

    this.width = 100;
    this.height = 100;

    this.orc = orc;

    this.loadSprites();
    this.spritesLoaded = false;
    this.spritesNumber = 5;
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

    const attackSprites = {
      attackRight0: 'assets/model/ork/right/ATTAK_000.png',
      attackRight1: 'assets/model/ork/right/ATTAK_001.png',
      attackRight2: 'assets/model/ork/right/ATTAK_002.png',
      attackRight3: 'assets/model/ork/right/ATTAK_003.png',
      attackRight4: 'assets/model/ork/right/ATTAK_004.png',
      attackRight5: 'assets/model/ork/right/ATTAK_005.png',
      attackRight6: 'assets/model/ork/right/ATTAK_006.png',

      attackLeft0: 'assets/model/ork/left/ATTAK_000.png',
      attackLeft1: 'assets/model/ork/left/ATTAK_001.png',
      attackLeft2: 'assets/model/ork/left/ATTAK_002.png',
      attackLeft3: 'assets/model/ork/left/ATTAK_003.png',
      attackLeft4: 'assets/model/ork/left/ATTAK_004.png',
      attackLeft5: 'assets/model/ork/left/ATTAK_005.png',
      attackLeft6: 'assets/model/ork/left/ATTAK_006.png'
    };

    const deadSprites = {
      deadRight0: 'assets/model/ork/right/DIE_000.png',
      deadRight1: 'assets/model/ork/right/DIE_001.png',
      deadRight2: 'assets/model/ork/right/DIE_002.png',
      deadRight3: 'assets/model/ork/right/DIE_003.png',
      deadRight4: 'assets/model/ork/right/DIE_004.png',
      deadRight5: 'assets/model/ork/right/DIE_005.png',
      deadRight6: 'assets/model/ork/right/DIE_006.png',

      deadLeft0: 'assets/model/ork/left/DIE_000.png',
      deadLeft1: 'assets/model/ork/left/DIE_001.png',
      deadLeft2: 'assets/model/ork/left/DIE_002.png',
      deadLeft3: 'assets/model/ork/left/DIE_003.png',
      deadLeft4: 'assets/model/ork/left/DIE_004.png',
      deadLeft5: 'assets/model/ork/left/DIE_005.png',
      deadLeft6: 'assets/model/ork/left/DIE_006.png'

    };
    imagesPreload(idleSprites, this.idleSprites, this.loaded.bind(this));
    imagesPreload(walkSprites, this.walkSprites, this.loaded.bind(this));
    imagesPreload(jumpSprites, this.jumpSprites, this.loaded.bind(this));
    imagesPreload(deadSprites, this.deadSprites, this.loaded.bind(this));
    imagesPreload(attackSprites, this.attackSprites, this.loaded.bind(this));
  }

  loaded() {
    if (--this.spritesNumber <= 0) {
      this.spritesLoaded = true;
    }
  }

  calculateNextIndex(type) {
    switch (type) {
      case 'walk'   : return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2); break;
      case 'idle'   : return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2); break;
      case 'jump'   : return Math.floor(this.jumpIndex += this.jumpRate) % (Object.keys(this.jumpSprites).length / 2); break;
      case 'dead'   : return Math.floor(this.deadIndex += this.deadRate) % (Object.keys(this.deadSprites).length / 2); break;
      case 'attack' : return Math.floor(this.attackIndex += this.attackRate) % (Object.keys(this.attackSprites).length / 2); break;

      default: return 0; break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'walk'   : return this.walkSprites;   break;
      case 'idle'   : return this.idleSprites;   break;
      case 'jump'   : return this.jumpSprites;   break;
      case 'dead'   : return this.deadSprites;   break;
      case 'attack' : return this.attackSprites;   break;

      default: return this.idleSprites; break;
    }
  }

  renderAnimation(ctx, x, y, type, direction) {
    type = type.toLowerCase();
    direction =  direction.charAt(0).toUpperCase() + direction.slice(1);

    const index = this.calculateNextIndex(type);
    const sprites = this.getAnimationSprite(type);

    if (sprites[`${type}${direction}${index}`]) {
      sprites[`${type}${direction}${index}`].drawAtCenter(ctx, x, y);
    }

    if (this.deadIndex > 1 && Math.floor(this.deadIndex) % ((Object.keys(this.deadSprites).length / 2)) === 0) {
      this.orc.kill();

      if (Math.random() < 0.2) {
        this.orc.knight.tokenManager.createLiveToken(this.orc.x, this.orc.y);
      }
    }
  }

  render(ctx, x, y, dir, isAttacking, isIdle, isDead) {
    if (this.spritesLoaded) {
      if (isDead && dir > 0) this.renderAnimation(ctx, x, y, 'dead', 'right');
      else if (isDead && dir < 0) this.renderAnimation(ctx, x, y, 'dead', 'left');
      else if (isAttacking && dir < 0) this.renderAnimation(ctx, x, y, 'attack', 'left');
      else if (isAttacking && dir > 0) this.renderAnimation(ctx, x, y, 'attack', 'right');
      else if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
      else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');
      else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
      else if (dir < 0)this.renderAnimation(ctx, x, y, 'walk', 'left');

      else this.renderAnimation(ctx, x, y, 'idle', 'right');
    }
  }


}
