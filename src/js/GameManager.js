let instance = null

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

class GameManager() {
  constructor() {
    if(instance) {
      return instance
    }
    instance = this

    return instance
  }
  //Get the GameManager instance
  //Just incase but we probably don't need it
  static getInstance() {
      return instance;
  }

  start() {
    //TODO start the game

  }

}
