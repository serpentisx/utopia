// The game itself. Every game objects and managers (entity, spatial, ... )
// should be handled here

class HollowKnightGame {

  constructor() {
    this.entityManager = new EntityManager();
    this.sprites = {};

    this.room = null;

    this.camera = new Camera(0, 0, canvas.width, canvas.height);   

  }

  init() {
    var knight = this.entityManager.createKnight(this.sprites.knight, {x: 100, y: 100});
    // Set the camera up to follow the knight
    this.camera.follow(knight, canvas.width/2, canvas.height/2);
    this.room = {
      width : this.sprites.background.width,
      height : this.sprites.background.height
    };
    console.log(this.room.width + " x " + this.room.height);
    this.map = new Map(this.sprites.background);
    this.camera.setDimensions(this.room.width, this.room.height);
  }

  loadSprites() {
    let images = {};
    let requiredImages = {
      knight : 'assets/knight.png',
      background : 'assets/hugeBackground.png'
    };

    imagesPreload(requiredImages, images, function() {
      for (let key in requiredImages) {
        this.sprites[key] = new Sprite(images[key]);
      }
      this.init();
    }.bind(this));
  }

  update(du) {
    if(this.room !== null) {
      this.entityManager.update(du, this.room.width, this.room.height);
      this.camera.update();

    }
  }

  render(ctx) {
    if(this.room !== null) {
      this.map.render(ctx, this.camera.xView, this.camera.yView);
      this.entityManager.render(ctx, this.camera.xView, this.camera.yView);
    }
    
  }
}
