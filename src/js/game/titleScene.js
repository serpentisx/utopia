class TitleScene extends Scene {

  constructor() {
    super();
    this.sprites = {};

    this.isLoaded = false;

    this.isChangingScenes = false;
    this.nextScene = false;

    this.loadSprites();

    this.clouds = {
      x : -1200,
      y : 0
    }


    this.button = {
      x : canvas.width/2,
      y : 500,
      w : 200, 
      h : 50
    };
    this.button.x -= this.button.w/2;

    // I would like to change all of this but
    // Need to store these in variables so that the event listener can access it
    var button = this.button;
    var changeScene = this.changeScene;
    var self = this;

    // Temporary event function
    canvas.addEventListener("click", function() {

    if(event.pageX > button.x && event.pageX < button.x+button.w && event.pageY < button.y+button.h 
      && event.pageY > button.y) {
      self.changeScene('game');
    }

    }, false); 

  }

  init() {
    this.isLoaded = true;
  }

  loadSprites() {
    let requiredImages = {
      background : 'assets/game_background_1/layers/sky.png',
      cloud : 'assets/game_background_1/layers/clouds_2.png'
    };
    imagesPreload(requiredImages, this.sprites, this.init.bind(this));
  }

  renderBackground(ctx) {
    this.sprites.background.drawAtCenter(ctx, 0, 0, 0);
    this.sprites.cloud.drawAtCenter(ctx, this.clouds.x, this.clouds.y, 0);

  }

  changeScene(scene) {
    this.isChangingScenes = true;
    this.nextScene = scene;
  }

  getNextScene() {
    this.isChangingScenes = false;
    var next = this.nextScene;
    this.nextScene = false;
    return next;
  }

  renderMenu(ctx) {
    ctx.font="80px Georgia";
    ctx.textAlign="center"; 
    ctx.fillText("Utopia", canvas.width/2, canvas.height/2)

    this.drawButton(ctx, this.button.x, this.button.y, this.button.w, this.button.h);
  }

  drawButton(ctx) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0099cc";
    ctx.fillStyle = "#abc";
    ctx.strokeRect(this.button.x, this.button.y, this.button.w, this.button.h);
    
    ctx.font="20px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0099cc";

    ctx.fillText("PLAY", this.button.x+this.button.w/2, this.button.y+this.button.h/2);
  } 

  update(du) {
    if(this.isLoaded) {
      this.clouds.x += 0.5;

    }
  }

  render(ctx) {
    if(this.isLoaded) {
      this.renderBackground(ctx);
      this.renderMenu(ctx);
    }
  }
} 
