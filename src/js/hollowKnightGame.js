// The game itself. Every game objects and managers (entity, spatial, ... )
// should be handled here

class HollowKnightGame {

  constructor(ctx) {
    this.ctx = ctx;
    this.entityManager = new EntityManager();
    this.sprites = {};
  }

  init() {
     this.entityManager.createKnight(this.sprites.knight, {x: 200, y: 200});
  }

  loadSprites() {
    let images = {};
    let requiredImages = {
      knight : 'assets/knight.png'
    };
    imagesPreload(requiredImages, images, function() {
      for (let key in requiredImages) {
        this.sprites[key] = new Sprite(images[key]);
      }
      this.init();
    }.bind(this));
  }

  update(du) {
    this.entityManager.update(du);
  }

  render(ctx) {
    this.entityManager.render(ctx);
  }
}