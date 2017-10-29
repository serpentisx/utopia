var keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
  keys[evt.keyCode] = false;
}

function eatKey(keyCode) {
  var isDown = keys[keyCode];
  keys[keyCode] = false;
  return isDown;
}

function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);