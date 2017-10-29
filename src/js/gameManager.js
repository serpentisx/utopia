"use strict";

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

function GameManager(game) {
  this.ctx = game.ctx;
  this.renderManager = new RenderManager(game.render)
  this.updateManager = new UpdateManager(game.update);

  this.KEY_QUIT = 'Q'.charCodeAt(0);
  this.TOGGLE_TIMER_SHOW = 'T'.charCodeAt(0);

  this.doTimerShow = false;
  this.isGameOver = false;

  this.frameTime_ms = null;
  this.frameTimeDelta_ms = null;
}

GameManager.prototype.iter = function(frameTime) {
  this.updateClocks(frameTime);
  this.iterCore(this.frameTimeDelta_ms);

  if (!this.isGameOver) this.requestNextIteration();
};

GameManager.prototype.updateClocks = function(frameTime) {
  if (this.frameTime_ms === null) this.frameTime_ms = frameTime;

  this.frameTimeDelta_ms = frameTime - this.frameTime_ms;
  this.frameTime_ms = frameTime;
};

GameManager.prototype.iterCore = function(dt) {
  if (this.requestedQuit()) {
    this.gameOver();
    return;
  }

  this.updateManager.update(dt);
  this.renderManager.render(this.ctx);
};

GameManager.prototype.gameOver = function() {
  this.isGameOver = true;
  console.log("gameOver: quitting...");
};

GameManager.prototype.requestedQuit = function() {
  return keys[this.KEY_QUIT];
};

GameManager.prototype.mainIterFrame = function(frameTime) {
  this.iter(frameTime);
};

GameManager.prototype.mainIterFrame = function(frameTime) {
  this.iter(frameTime);
}

GameManager.prototype.requestNextIteration = function() {
  window.requestAnimationFrame(this.mainIterFrame.bind(this));
};

GameManager.prototype.start = function() {
  this.requestNextIteration();
};