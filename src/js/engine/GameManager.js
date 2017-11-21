"use strict";

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
let instance = null;

class GameManager {

  constructor(sceneManager) {
    if (instance) {
      return instance;
    }
    this.keys = {};
    this.stopKey = false;

    this.renderManager = new RenderManager(sceneManager.render.bind(sceneManager));
    this.updateManager = new UpdateManager(sceneManager.update.bind(sceneManager));

    this.isGameOver = false;
    this.frameTime_ms = null;
    this.frameTimeDelta_ms = null;
    this.sceneManager = sceneManager;
    this.mainIterFrame = this.mainIterFrame.bind(this);

    instance = this;
    return instance;
  }

  static getInstance() {
    return instance;
  }

  updateClocks(frameTime) {
    if (this.frameTime_ms === null) this.frameTime_ms = frameTime;

    this.frameTimeDelta_ms = frameTime - this.frameTime_ms;
    this.frameTime_ms = frameTime;
  }

  iterCore(dt) {
    if (this.stopKey) {
      this.gameOver();
      return;
    }

    this.updateManager.update(dt);
    this.renderManager.render(ctx);
  }

  gameOver() {
    this.isGameOver = true;
    console.log("gameOver: quitting...");
  }

  mainIterFrame(frameTime) {
    this.updateClocks(frameTime);
    this.iterCore(this.frameTimeDelta_ms);

    if (!this.isGameOver) this.requestNextIteration();
  }

  requestNextIteration() {
    window.requestAnimationFrame(this.mainIterFrame)
  }
}
