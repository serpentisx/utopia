"use strict";

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
let instance = null;

class GameManager {

  static getInstance() {
    return instance;
  }

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

    instance = this;
  }

  iter(frameTime) {
    this.updateClocks(frameTime);
    this.iterCore(this.frameTimeDelta_ms);

    if (!this.isGameOver) this.requestNextIteration();
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
    this.iter(frameTime);
  }

  requestNextIteration() {
    window.requestAnimationFrame(this.mainIterFrame.bind(this));
  }

  start() {
    this.requestNextIteration();
  }
}
