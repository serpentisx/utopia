/**
 * All the controls are done here
 * Keys, mouse evt etc
 */
class Controls {
  constructor() {
    this.key_step = false
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("keyup", this.handleKeyup.bind(this));

    this.initializeFullscreenListener();
  }
  gameEngineKey(e) {
    switch (KEYS[e.keyCode]) {
      case "q":
        stopKey = true
        break;
      case "c":
        doClear = !doClear
        break;
      case "r":
        doRender = !doRender
        break;
      default: break
    }
  }

  knightKey(e) {
    if(KEYS[e.keyCode] == "a") {}
  }

  handleKeydown(e) {
    //Check which key to use
    this.gameEngineKey(e)
    this.knightKey(e)

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
    $("#fullscreen").on("click", () => {
      this.toggleFullscreen();
    });
  }

  toggleFullscreen() {
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
