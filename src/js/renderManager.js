function RenderManager(renderer) {
  this.renderer = renderer;

  this.doClear = true;
  this.doRender = true;

  this.frameCounter = 1;

  this.TOGGLE_CLEAR = 'C'.charCodeAt(0);
  this.TOGGLE_RENDER = 'R'.charCodeAt(0);
}

RenderManager.prototype.render = function(ctx) {
  if (eatKey(this.TOGGLE_CLEAR)) this.doClear = !this.doClear;
  if (eatKey(this.TOGGLE_RENDER)) this.doRender = !this.doRender;

  if (this.doClear) util.clearCanvas(ctx);
  if (this.doRender) this.renderer(ctx);

  this.frameCounter++;
};