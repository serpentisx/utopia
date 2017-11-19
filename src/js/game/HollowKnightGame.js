class HollowKnightGame extends Scene {

  constructor() {
    super();

    this.entityManager = new EntityManager();
    this.coinManager;

    this.map;
    this.sprites = {};
    this.camera = new Camera(0, 0, canvas.width, canvas.height);

    this.isStarted = false;
    this.loadSprites();
  }

  init() {
    this.map = new Map(this.sprites.background);

    this.knight = this.entityManager.createKnight(30, 700);
    this.entityManager.createEnemies();

    // Set the camera up to follow the knight
    this.camera.follow(this.knight, canvas.width / 2, canvas.height / 2);
    this.camera.setWorldDimensions(this.sprites.background.width, this.sprites.background.height);

    this.coinManager = new CoinManager(this.knight);

    this.isStarted = true;
  }

  loadSprites() {
    let requiredImages = {
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
        this.map.renderForeground(ctx, this.camera.xView, this.camera.yView);
        this.coinManager.render(ctx, this.camera.xView, this.camera.yView);
      }
    }
  }
}
