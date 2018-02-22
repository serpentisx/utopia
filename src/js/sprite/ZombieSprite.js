class ZombieSprite {

  constructor(zombie) {
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

    this.width = 110;
    this.height = 97;

    this.zombie = zombie;

    this.loadSprites();
    this.spritesLoaded = false;
    this.spritesNumber = 6;
  }

  loadSprites() {
    const idleSprites = {
      idleRight0: 'assets/model/zombie/right/Idle1.png',
      idleRight1: 'assets/model/zombie/right/Idle2.png',
      idleRight2: 'assets/model/zombie/right/Idle3.png',
      idleRight3: 'assets/model/zombie/right/Idle4.png',

      idleLeft0: 'assets/model/zombie/left/Idle1_.png',
      idleLeft1: 'assets/model/zombie/left/Idle2_.png',
      idleLeft2: 'assets/model/zombie/left/Idle3_.png',
      idleLeft3: 'assets/model/zombie/left/Idle4_.png'
    };

    const walkSprites = {
      walkRight0: 'assets/model/zombie/right/Walk1.png',
      walkRight1: 'assets/model/zombie/right/Walk2.png',
      walkRight2: 'assets/model/zombie/right/Walk3.png',
      walkRight3: 'assets/model/zombie/right/Walk4.png',
      walkRight4: 'assets/model/zombie/right/Walk5.png',
      walkRight5: 'assets/model/zombie/right/Walk6.png',

      walkLeft0: 'assets/model/zombie/left/Walk1_.png',
      walkLeft1: 'assets/model/zombie/left/Walk2_.png',
      walkLeft2: 'assets/model/zombie/left/Walk3_.png',
      walkLeft3: 'assets/model/zombie/left/Walk4_.png',
      walkLeft4: 'assets/model/zombie/left/Walk5_.png',
      walkLeft5: 'assets/model/zombie/left/Walk6_.png'
    };

    const runSprites = {
      runRight0: 'assets/model/zombie/right/Run1.png',
      runRight1: 'assets/model/zombie/right/Run2.png',
      runRight2: 'assets/model/zombie/right/Run3.png',
      runRight3: 'assets/model/zombie/right/Run4.png',
      runRight4: 'assets/model/zombie/right/Run5.png',
      runRight5: 'assets/model/zombie/right/Run6.png',
      runRight6: 'assets/model/zombie/right/Run7.png',
      runRight7: 'assets/model/zombie/right/Run8.png',
      runRight8: 'assets/model/zombie/right/Run9.png',
      runRight9: 'assets/model/zombie/right/Run10.png',

      runLeft0: 'assets/model/zombie/left/Run1_.png',
      runLeft1: 'assets/model/zombie/left/Run2_.png',
      runLeft2: 'assets/model/zombie/left/Run3_.png',
      runLeft3: 'assets/model/zombie/left/Run4_.png',
      runLeft4: 'assets/model/zombie/left/Run5_.png',
      runLeft5: 'assets/model/zombie/left/Run6_.png',
      runLeft6: 'assets/model/zombie/left/Run7_.png',
      runLeft7: 'assets/model/zombie/left/Run8_.png',
      runLeft8: 'assets/model/zombie/left/Run9_.png',
      runLeft9: 'assets/model/zombie/left/Run10_.png'
    };

    const hurtSprites = {
      hurtRight0: 'assets/model/zombie/right/Hurt1.png',
      hurtRight1: 'assets/model/zombie/right/Hurt2.png',
      hurtRight2: 'assets/model/zombie/right/Hurt3.png',
      hurtRight3: 'assets/model/zombie/right/Hurt4.png',
      hurtRight4: 'assets/model/zombie/right/Hurt5.png',

      hurtLeft0: 'assets/model/zombie/left/Hurt1_.png',
      hurtLeft1: 'assets/model/zombie/left/Hurt2_.png',
      hurtLeft2: 'assets/model/zombie/left/Hurt3_.png',
      hurtLeft3: 'assets/model/zombie/left/Hurt4_.png',
      hurtLeft4: 'assets/model/zombie/left/Hurt5_.png'
    };

    const attackSprites = {
      attackRight0: 'assets/model/zombie/right/Attack1.png',
      attackRight1: 'assets/model/zombie/right/Attack2.png',
      attackRight2: 'assets/model/zombie/right/Attack3.png',
      attackRight3: 'assets/model/zombie/right/Attack4.png',
      attackRight4: 'assets/model/zombie/right/Attack5.png',
      attackRight5: 'assets/model/zombie/right/Attack6.png',

      attackLeft0: 'assets/model/zombie/left/Attack1_.png',
      attackLeft1: 'assets/model/zombie/left/Attack2_.png',
      attackLeft2: 'assets/model/zombie/left/Attack3_.png',
      attackLeft3: 'assets/model/zombie/left/Attack4_.png',
      attackLeft4: 'assets/model/zombie/left/Attack5_.png',
      attackLeft5: 'assets/model/zombie/left/Attack6_.png'
    };

    const deadSprites = {
      deadRight0: 'assets/model/zombie/right/Dead1.png',
      deadRight1: 'assets/model/zombie/right/Dead2.png',
      deadRight2: 'assets/model/zombie/right/Dead3.png',
      deadRight3: 'assets/model/zombie/right/Dead4.png',
      deadRight4: 'assets/model/zombie/right/Dead5.png',
      deadRight5: 'assets/model/zombie/right/Dead6.png',
      deadRight6: 'assets/model/zombie/right/Dead7.png',
      deadRight7: 'assets/model/zombie/right/Dead8.png',

      deadLeft0: 'assets/model/zombie/left/Dead1_.png',
      deadLeft1: 'assets/model/zombie/left/Dead2_.png',
      deadLeft2: 'assets/model/zombie/left/Dead3_.png',
      deadLeft3: 'assets/model/zombie/left/Dead4_.png',
      deadLeft4: 'assets/model/zombie/left/Dead5_.png',
      deadLeft5: 'assets/model/zombie/left/Dead6_.png',
      deadLeft6: 'assets/model/zombie/left/Dead7_.png',
      deadLeft7: 'assets/model/zombie/left/Dead8_.png'
    };

    imagesPreload(idleSprites, this.idleSprites, this.loaded.bind(this));
    imagesPreload(walkSprites, this.walkSprites, this.loaded.bind(this));
    imagesPreload(runSprites, this.runSprites, this.loaded.bind(this));
    imagesPreload(attackSprites, this.attackSprites, this.loaded.bind(this));
    imagesPreload(hurtSprites, this.hurtSprites, this.loaded.bind(this));
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
      case 'hurt'   : return Math.floor(this.hurtIndex += this.hurtRate) % (Object.keys(this.hurtSprites).length / 2); break;
      case 'dead'   : return Math.floor(this.deadIndex += this.deadRate) % (Object.keys(this.deadSprites).length / 2); break;
      case 'walk'   : return Math.floor(this.walkIndex += this.walkRate) % (Object.keys(this.walkSprites).length / 2); break;
      case 'run'    : return Math.floor(this.runIndex += this.runRate) % (Object.keys(this.runSprites).length / 2);    break;
      case 'idle'   : return Math.floor(this.idleIndex += this.idleRate) % (Object.keys(this.idleSprites).length / 2); break;

      default: return 0; break;
    }
  }

  getAnimationSprite(type) {
    switch (type) {
      case 'attack' : return this.attackSprites; break;
      case 'hurt'   : return this.hurtSprites;   break;
      case 'dead'   : return this.deadSprites;   break;
      case 'walk'   : return this.walkSprites;   break;
      case 'run'    : return this.runSprites;    break;
      case 'idle'   : return this.idleSprites;   break;

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

    if (this.hurtIndex > 1 && Math.floor(this.hurtIndex) % ((Object.keys(this.hurtSprites).length / 2) * 2) === 0) {
      this.zombie.isHurt = false;
    }

    if (this.deadIndex > 1 && Math.floor(this.deadIndex) % ((Object.keys(this.deadSprites).length / 2)) === 0) {
      this.zombie.kill();

      if (Math.random() < 0.2) {
        this.zombie.knight.tokenManager.createLiveToken(this.zombie.x, this.zombie.y);
      }
    }
  }

  render(ctx, x, y, dir, attacking, isIdle, isHurt, isDead) {
    if (this.spritesLoaded) {
      if (isDead && dir > 0) this.renderAnimation(ctx, x, y, 'dead', 'right');
      else if (isDead && dir < 0) this.renderAnimation(ctx, x, y, 'dead', 'left');
      else if (isHurt && dir > 0) this.renderAnimation(ctx, x, y, 'hurt', 'right');
      else if (isHurt && dir < 0) this.renderAnimation(ctx, x, y, 'hurt', 'left');
      else if (isIdle && dir > 0) this.renderAnimation(ctx, x, y, 'idle', 'right');
      else if (isIdle && dir < 0) this.renderAnimation(ctx, x, y, 'idle', 'left');
      else if (attacking && dir < 0) this.renderAnimation(ctx, x, y, 'attack', 'left');
      else if (attacking && dir > 0) this.renderAnimation(ctx, x, y, 'attack', 'right');
      else if (dir > 0) this.renderAnimation(ctx, x, y, 'walk', 'right');
      else if (dir < 0)this.renderAnimation(ctx, x, y, 'walk', 'left');

      else this.renderAnimation(ctx, x, y, 'idle', 'right');
    }
  }


}
