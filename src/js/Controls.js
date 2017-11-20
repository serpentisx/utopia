/**
 * All the controls are done here
 * Keys, mouse evt etc
 */
let keys = {}

class Controls {
  constructor() {
    this.gm = GameManager.getInstance();
    this.scene = this.gm.sceneManager;
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("keyup", this.handleKeyup.bind(this));
    //canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    //canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));

    //this.initializeFullscreenListener()
    this.quitGame()
  }

  checkKey(e) {
    let didPlayerPressSpace = false;

    switch (KEYS[e.keyCode]) {
      case "c":
        this.gm.renderManager.doClear = !this.gm.renderManager.doClear
        break;
      case "r":
        this.gm.renderManager.doRender = !this.gm.renderManager.doRender
        break
      case "q":
        this.gm.stopKey = true
        break
      case "space":
        const knight  = this.gm.sceneManager.currentScene.knight;
        knight.isAttacking = true;
        didPlayerPressSpace = true;
        break
      default:
        break
    }

    if(!didPlayerPressSpace) knight.isAttacking = false;
  }

  handleKeydown(e) {
    //Check which key to use
    this.checkKey(e)

    // Remember that this key is down.
    if (e.keyCode in KEYS) {
      const keyName = KEYS[e.keyCode]
      keys[keyName] = true
    }
    keys[e.keyCode] = true;
  }

  handleKeyup(e) {
    // Remember that this key is up.
    if (e.keyCode in KEYS) {
      const keyName = KEYS[e.keyCode]
      keys[keyName] = false
    }
    keys[e.keyCode] = false;
  }

  handleMouseDown(e) {
    if (KEYS[e.which] == "leftClick") {
      console.log(e.offsetX, e.offsetY);
    }
    // Remember that the mouse is pressed down.
    if (e.which in KEYS) {
      const keyName = KEYS[e.which];
      keys[keyName] = true;
    }
  }

  handleMouseUp(e) {
    // Remember that the mouse is released.
    if (e.which in KEYS) {
      const keyName = KEYS[e.which];
      keys[keyName] = false;
    }
  }

  initializeFullscreenListener() {
		$("#play").on("click", () => {
			this.toggleFullscreen();
    });
	}

	quitGame() {
		$("#quit").on("click", () => {
			this.gm.stopKey = true
		});
	}

  toggleFullscreen() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    if (document.fullscreenElement || document.webkitFullscreenElement ||
      document.mozFullScreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

    } else {
      const element = $("#myCanvas").get(0);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }
}
