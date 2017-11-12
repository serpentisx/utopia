class KnightSprite {

  constructor() {
    this.sprites = {};

    this.numSprite = 5;
    this.walkIndex = 0;
    this.idleIndex = 0;
    this.jumpingIndex = 0;
    this.updateRate = 0.2;

    this.width = 140;
    this.height = 108;

    this.loadSprites();
  }

  loadSprites() {
    let requiredImages = {
      idle0: 'assets/character/idle/1.png',
      idle1: 'assets/character/idle/2.png',
      idle2: 'assets/character/idle/3.png',
      idle3: 'assets/character/idle/2.png',
      idle4: 'assets/character/idle/3.png',
      walk0: 'assets/model/ork/WALK_000.png',
      walk1: 'assets/model/ork/WALK_001.png',
      walk2: 'assets/model/ork/WALK_002.png',
      walk3: 'assets/model/ork/WALK_003.png',
      walk4: 'assets/model/ork/WALK_004.png',
      jump0: 'assets/model/ork/JUMP_000.png',
      jump1: 'assets/model/ork/JUMP_001.png',
      jump2: 'assets/model/ork/JUMP_002.png',
      jump3: 'assets/model/ork/JUMP_003.png',
      jump4: 'assets/model/ork/JUMP_004.png',
    };
    imagesPreload(requiredImages, this.sprites, function empty() {});
  }

  renderWalkRight(ctx, x, y) {
    let index = Math.floor(this.walkIndex += this.updateRate) % this.numSprite;
    this.sprites[`walk${index}`].drawAtCenter(ctx, x, y);
  }

  renderWalkLeft(ctx, x, y) {
    let index = Math.floor(this.walkIndex += this.updateRate) % this.numSprite;
    this.sprites[`walk${index}`].drawAtCenterFlipped(ctx, x, y);
  }

  renderJumpingRight(ctx, x, y) {
    let index = Math.floor(this.jumpingIndex += this.updateRate) % this.numSprite;
    this.sprites[`jump${index}`].drawAtCenter(ctx, x, y);
  }

  renderJumpingLeft(ctx, x, y) {
    let index = Math.floor(this.jumpingIndex += this.updateRate) % this.numSprite;
    this.sprites[`jump${index}`].drawAtCenterFlipped(ctx, x, y);
  }

  renderIdleRight(ctx, x, y) {
    let index = Math.floor(this.idleIndex += this.updateRate) % this.numSprite;
    this.sprites[`idle${index}`].drawAtCenter(ctx, x, y);
  }

  renderIdleLeft(ctx, x, y) {
    let index = Math.floor(this.idleIndex += this.updateRate) % this.numSprite;
    this.sprites[`idle${index}`].drawAtCenterFlipped(ctx, x, y);
  }

  render(ctx, x, y, dir, jumping, isIdle) {
    if (jumping && dir > 0) this.renderJumpingRight(ctx, x, y);
    else if (jumping && dir < 0) this.renderJumpingLeft(ctx, x, y);
    else if (isIdle && dir > 0) this.renderIdleRight(ctx, x, y);
    else if (isIdle && dir < 0) this.renderIdleLeft(ctx, x, y);
    else if (dir > 0) this.renderWalkRight(ctx, x, y);
    else this.renderWalkLeft(ctx, x, y);
  }
}
