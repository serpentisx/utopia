// The game itself. Every game objects and managers (entity, spatial, ... )
// should be handled here

class HollowKnightGame {

  constructor() {
    this.entityManager = new EntityManager();
    this.sprites = {};
    this.camera = new Camera(0, 0, canvas.width, canvas.height);

    this.isStarted = false;
  }

  init() {
    this.knight = this.entityManager.createKnight(this.sprites.knight, {x: 3000, y: 100});
    // Set the camera up to follow the knight
    this.camera.follow(this.knight, canvas.width/2, canvas.height/2);
    this.map = new Map(this.sprites.background);
    this.camera.setWorldDimensions(this.sprites.background.width, this.sprites.background.height);

    this.isStarted = true;
  }

  loadSprites() {
    let requiredImages = {
      knight : 'assets/knight.png',
      background : 'assets/large-background.png'
    };
    imagesPreload(requiredImages, this.sprites, this.init.bind(this));
  }

  update(du) {
    this.entityManager.update(du, this.camera.worldRect.width, this.camera.worldRect.height);
    this.camera.update();
  }

  render(ctx) {
    this.map.render(ctx, this.camera.xView, this.camera.yView);
    this.entityManager.render(ctx, this.camera.xView, this.camera.yView);
  }
}
