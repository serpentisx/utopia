class MainMenu extends Scene {

  constructor() {
    super();
    this.sprites = {};
    this.spriteSheet = {};

    this.isLoaded = false;

    this.loadSprites();
    this.music = new Audio('sounds/intro.wav');
    this.buttonhover = new Audio('sounds/buttonhover.wav');
    this.music.loop = true;

    this.clouds = {
      x : -1200,
      y : 0
    }

    this.rocks = {
      x : 0,
      y : 100
    }

    // This is for the event listener
    let self = this;

    document.getElementById('play').addEventListener("click", () => {
      // Change scene to game once button is pressed
      self.changeScene('game');
      document.getElementById('menu').style.visibility = 'hidden';

    }, false);

    // Play sound on button hover - change the sound because its horrible
    var buttonsound = this.buttonhover;

    $("button").mouseenter(function(){
      buttonsound.play();
    });


  }

  init() {
    this.music.play();
    this.isLoaded = true;

  }

  loadSprites() {
    let requiredImages = {
      background : 'assets/game_background_1/layers/sky.png',
      cloud : 'assets/game_background_1/layers/clouds_2.png',
      rocks : 'assets/game_background_1/layers/rocks_1.png'
      };
    imagesPreload(requiredImages, this.sprites, this.init.bind(this));
  }

  // This could be transferred/changed to some other class so we can use it for the game as well
  renderBackground(ctx) {
    this.sprites.background.drawAtCorner(ctx, 0, 0, 0);
    this.sprites.rocks.drawAtCorner(ctx, this.rocks.x-=0.2, this.rocks.y);
    this.sprites.cloud.drawAtCorner(ctx, this.clouds.x+=0.5, this.clouds.y, 0);
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
    // Probably update some sprite sheets here
  }

  render(ctx) {
    if(this.isLoaded) {
      this.renderBackground(ctx);
    }
  }
}
