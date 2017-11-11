// The game itself. Every game objects and managers (entity, spatial, ... )
// should be handled here

class HollowKnightGame extends Scene {

  constructor() {
    super();

    this.entityManager = new EntityManager();
    this.coinManager;

    this.sprites = {};
    this.camera = new Camera(0, 0, canvas.width, canvas.height);

    this.isStarted = false;
    this.loadSprites();
  }

  init() {
    this.knight = this.entityManager.createKnight({x: 3000, y: 100});
    this.coinManager = new CoinManager(this.knight);

    // Set the camera up to follow the knight
    this.camera.follow(this.knight, canvas.width / 2, canvas.height / 2);
    this.map = new Map(this.sprites.background);

    this.knight.setMap(this.map);
    this.camera.setWorldDimensions(this.sprites.background.width, this.sprites.background.height);
    this.isStarted = true;
  }

  loadSprites() {
    let requiredImages = {
      knight: 'assets/knight.png',
      background: 'assets/platformer_background_3/Layers/layer07_Sky.png'
    };
    imagesPreload(requiredImages, this.sprites, this.init.bind(this));
  }

  update(du) {
    if (this.isStarted) {
      if (!this.isPaused) {
        this.entityManager.update(du, this.camera.worldRect.width, this.camera.worldRect.height, this.map);
        this.coinManager.update(du);
        this.camera.update();
      }
    }
  }

  render(ctx) {
    if (this.isStarted) {
      if (!this.isPaused) {
        this.map.render(ctx, this.camera.xView, this.camera.yView);
        this.entityManager.render(ctx, this.camera.xView, this.camera.yView);
        this.coinManager.render(ctx, this.camera.xView, this.camera.yView);
      }
    }
  }
}
