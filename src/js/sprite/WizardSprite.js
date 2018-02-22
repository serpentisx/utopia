class WizardSprite {

  constructor(wizard) {
    this.walkSprites = {};
    this.runSprites = {};
    this.hurtSprites = {};
    this.attackSprites = {};
    this.idleSprites = {};
    this.deadSprites = {};

    this.attackIndex = 0;
    this.hurtIndex = 0;
    this.deadIndex = 0;
    this.walkIndex = 0;
    this.runIndex = 0;
    this.idleIndex = 0;

    this.attackRate = 0.08;
    this.hurtRate = 0.08;
    this.deadRate = 0.08;
    this.walkRate = 0.08;
    this.runRate = 0.07;
    this.idleRate = 0.08;

    this.wizard = wizard;

    this.loadSprites();
    this.spritesLoaded = false;
    this.spritesNumber = 4;
  }

  loadSprites() {
    const idleSprites = {
      idleRight0: 'assets/model/wizard/right/1_IDLE_000.png',
      idleRight1: 'assets/model/wizard/right/1_IDLE_001.png',
      idleRight2: 'assets/model/wizard/right/1_IDLE_002.png',
      idleRight3: 'assets/model/wizard/right/1_IDLE_003.png',
      idleRight4: 'assets/model/wizard/right/1_IDLE_004.png',

      idleLeft0: 'assets/model/wizard/left/1_IDLE_000.png',
      idleLeft1: 'assets/model/wizard/left/1_IDLE_001.png',
      idleLeft2: 'assets/model/wizard/left/1_IDLE_002.png',
      idleLeft3: 'assets/model/wizard/left/1_IDLE_003.png',
      idleLeft4: 'assets/model/wizard/left/1_IDLE_004.png'
    };

    const walkSprites = {
      walkRight0: 'assets/model/wizard/right/2_WALK_001.png',
      walkRight1: 'assets/model/wizard/right/2_WALK_002.png',
      walkRight2: 'assets/model/wizard/right/2_WALK_003.png',
      walkRight3: 'assets/model/wizard/right/2_WALK_004.png',

      walkLeft0: 'assets/model/wizard/left/2_WALK_001.png',
      walkLeft1: 'assets/model/wizard/left/2_WALK_002.png',
      walkLeft2: 'assets/model/wizard/left/2_WALK_003.png',
      walkLeft3: 'assets/model/wizard/left/2_WALK_004.png',
    };

    const attackSprites = {
      attackRight0: 'assets/model/wizard/right/5_ATTACK_000.png',
      attackRight1: 'assets/model/wizard/right/5_ATTACK_004.png',
      attackRight2: 'assets/model/wizard/right/5_ATTACK_006.png',
      attackRight3: 'assets/model/wizard/right/5_ATTACK_008.png',
      attackRight4: 'assets/model/wizard/right/5_ATTACK_009.png',

      attackLeft0: 'assets/model/wizard/left/5_ATTACK_000.png',
      attackLeft1: 'assets/model/wizard/left/5_ATTACK_004.png',
      attackLeft2: 'assets/model/wizard/left/5_ATTACK_006.png',
      attackLeft3: 'assets/model/wizard/left/5_ATTACK_008.png',
      attackLeft4: 'assets/model/wizard/left/5_ATTACK_009.png'
    };

    const deadSprites = {
      deadRight0: 'assets/model/wizard/right/7_DIE_000.png',
      deadRight1: 'assets/model/wizard/right/7_DIE_002.png',
      deadRight2: 'assets/model/wizard/right/7_DIE_004.png',
      deadRight3: 'assets/model/wizard/right/7_DIE_006.png',
      deadRight4: 'assets/model/wizard/right/7_DIE_008.png',

      deadLeft0: 'assets/model/wizard/left/7_DIE_000.png',
      deadLeft1: 'assets/model/wizard/left/7_DIE_002.png',
      deadLeft2: 'assets/model/wizard/left/7_DIE_004.png',
      deadLeft3: 'assets/model/wizard/left/7_DIE_006.png',
      deadLeft4: 'assets/model/wizard/left/7_DIE_008.png'
    };

    imagesPreload(idleSprites, this.idleSprites, this.loaded.bind(this));
    imagesPreload(walkSprites, this.walkSprites, this.loaded.bind(this));
    imagesPreload(attackSprites, this.attackSprites, this.loaded.bind(this));
    imagesPreload(deadSprites, this.deadSprites, this.loaded.bind(this));
  }

  loaded() {
    if (--this.spritesNumber <= 0) {
      this.spritesLoaded = true;
    }
  }

  calculateNextIndex(type) {
    switch (type) {
      case 'attack' : return Math.floor(this.attackIndex += this.attackRate) % (Object.keys(this.attackSprites).length / 2); break;
      case 'dead'   : return Math.floor(this.deadIndex += this.deadRate) % (Object.keys(this.deadSprites).length / 2); break;
      case 'walk'   : return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2); break;
      case 'idle'   : return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2); break;

      default: return 0; break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'attack' : return this.attackSprites; break;
      case 'dead'   : return this.deadSprites;   break;
      case 'walk'   : return this.walkSprites;   break;
      case 'idle'   : return this.idleSprites;   break;

      default: return this.idleSprites; break;
    }
  }

  renderAnimation(ctx, x, y, type, direction) {
    type = type.toLowerCase();
    direction =  direction.charAt(0).toUpperCase() + direction.slice(1);

    const index = this.calculateNextIndex(type);
    const sprites = this.getAnimationSprite(type);

    sprites[`${type}${direction}${index}`].drawAtCenter(ctx, x, y);

    if (this.deadIndex > 1 && Math.floor(this.deadIndex) % ((Object.keys(this.deadSprites).length / 2)) === 0) {
      this.wizard.kill();
    }

    if (this.wizard.isAttacking && this.attackIndex > 1 && Math.floor(this.attackIndex) % ((Object.keys(this.attackSprites).length / 2)) === 0) {
      if (this.wizard.isBulletAttack) {
        this.wizard.attackWithBullet();
        this.wizard.isAttacking = false;
        this.wizard.isBulletAttack = false;
        this.attackIndex = 0;
      }
      else if (this.wizard.isProjectTileAttack) {
        this.wizard.attackWithProjectile();
        this.wizard.isAttacking = false;
        this.wizard.isProjectTileAttack = false;
        this.attackIndex = 0;
      }
    }

    this.width = sprites[`${type}${direction}${index}`].width;
    this.height = sprites[`${type}${direction}${index}`].height;
  }

  render(ctx, x, y, dir, attacking, isIdle, isDead) {
    if (this.spritesLoaded) {
      if (isDead && dir > 0) this.renderAnimation(ctx, x, y, 'dead', 'right');
      else if (isDead && dir < 0) this.renderAnimation(ctx, x, y, 'dead', 'left');
      else if (attacking && dir < 0) this.renderAnimation(ctx, x, y, 'attack', 'left');
      else if (attacking && dir > 0) this.renderAnimation(ctx, x, y, 'attack', 'right');
      else if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
      else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');
      else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
      else if (dir < 0)this.renderAnimation(ctx, x, y, 'walk', 'left');

      else this.renderAnimation(ctx, x, y, 'idle', 'right');
    }
  }


}
