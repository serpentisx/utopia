class Scene {
  constructor() {
    this.isPaused = false;
    this.isChangingScene = false;
    this.nextScene = false;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  isPaused() {
    return this.isPaused;
  }

  changeScene(nextScene) {
    this.isChangingScene = true;
    this.nextScene = nextScene;
  }

  getNextScene() {
    this.isChangingScenes = false;
    var next = this.nextScene;
    this.nextScene = false;
    return next;
  }

}