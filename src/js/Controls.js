/**
 * All the controls are done here
 * Keys, mouse evt etc
 */
let keys = {}

class Controls {
  constructor() {
    this.gm = GameManager.getInstance();
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("keyup", this.handleKeyup.bind(this));
    this.initializeFullscreenListener();
    this.initializeInstructionListener();
  }

  checkKey(e) {
    let knight  = this.gm.sceneManager.getSceneByID('game').knight;
    switch (KEYS[e.keyCode]) {
      case "c":
        this.gm.renderManager.doClear = !this.gm.renderManager.doClear
        break;
      case "r":
        this.gm.renderManager.doRender = !this.gm.renderManager.doRender
        break
      case "space":
        knight.isAttacking = true;
        break
      default:
        break
    }
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

  initializeFullscreenListener() {
		$("#play").on("click", () => {
			this.toggleFullscreen();
    });
	}

  initializeInstructionListener() {
    $("#instructions").on("click", () => {
      location.href = "instruction.html";
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
