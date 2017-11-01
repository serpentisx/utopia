class KeyController {
  constructor(flag) {
    this.keys = [];
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(evt) {
    this.keys[evt.keyCode] = true;
  }

  handleKeyUp(evt) {
    this.keys[evt.keyCode] = false;
  }

  isPressing(key) {
    let keyCode = key.charCodeAt(0);
    let isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
  }

  keyCode(keyChar) {
    return keyChar.charCodeAt(0);
  }
}