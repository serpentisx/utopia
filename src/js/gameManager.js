"use strict";

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let instance = null
/**
 * Main GameManager class where all objects are
 * initialized and the main game loop is run.
 */
class GameManager {
  constructor() {
    if(instance) {
      return instance
    }

    this._frameTime_ms = null
    this._frameTimeDelta_ms = null
    this.mainIterFrame = this.mainIterFrame.bind(this)


    instance = this
    return instance
  }

  //Get the GameManager instance
  static getInstance() {
      return instance;
  }

  updateClocks(frameTime) {
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;

    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
  }
  /**
   * Rending the game objects
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  renderSimulation(ctx) {
    //TODO Updating the sprite, and something here
    //console.log("updating")

  }
  render(ctx) {
    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //
    if (!doClear) Utils.clearCanvas(ctx);

    // The main purpose of the box is to demonstrate that it is
    // always deleted by the subsequent "undo" before you get to
    // see it...
    //
    // i.e. double-buffering prevents flicker!
    //
    if (doBox) Utils.fillBox(ctx, 200, 200, 50, 50, "red");


    // The core rendering of the actual game / simulation
    //
    if (doRender) this.renderSimulation(ctx);


    // This flip-flip mechanism illustrates the pattern of alternation
    // between frames, which provides a crude illustration of whether
    // we are running "in sync" with the display refresh rate.
    //
    // e.g. in pathological cases, we might only see the "even" frames.
    //
    if (doFlipFlop) {
      var boxX = 250,
          boxY = isUpdateOdd ? 100 : 200;

      // Draw flip-flop box
      Utils.fillBox(ctx, boxX, boxY, 50, 50, "green");

      // Display the current frame-counter in the box...
      ctx.fillText(frameCounter % 1000, boxX + 10, boxY + 20);
      // ..and its odd/even status too
      var text = frameCounter % 2 ? "odd" : "even";
      ctx.fillText(text, boxX + 10, boxY + 40);
    }

    // Optional erasure of diagnostic "box",
    // to illustrate flicker-proof double-buffering
    //
    if (undoBox) ctx.clearRect(200, 200, 50, 50);

    ++frameCounter;
  }


  iterCore(dt) {
    // Handle QUIT
    if (stopKey) {
      this.gameOver()
      return
    }

    // gatherInputs();
    this.update(dt);
    this.render(ctx);
  }

  gameOver() {
    isGameOver = true
    console.log("gameOver: quitting...");
  }

  //Perform iteration

  mainIterFrame(frameTime) {
    // Use the given frameTime to update all of our game-clocks
    this.updateClocks(frameTime)

    // Perform the iteration core to do all the "real" work
    this.iterCore(this._frameTime_ms)

    // Diagnostics, such as showing current timer values etc.
    this.debugRender(ctx)

    // Request the next iteration if needed
    if (!isGameOver) this.requestNextIteration()
  }

  requestNextIteration() {
    window.requestAnimationFrame(this.mainIterFrame)
  }

  // Mainloop-level debug-rendering

  debugRender(ctx) {

    if (!doTimerShow) return;

    const y = 350;
    ctx.fillText('FT ' + this._frameTime_ms, 50, y+10);
    ctx.fillText('FD ' + this._frameTimeDelta_ms, 50, y+20);
    ctx.fillText('UU ' + this.prevUpdateDu, 50, y+30);
    ctx.fillText('FrameSync ON', 50, y+40);
  }
  /**
   * updating the game simulation
   * @param  {[type]} du
   * @return {[type]}    [description]
   */
  updateSimulation(du) {
    //console.log("updating");
  }

  update(dt) {
    // Get out if skipping (e.g. due to pause-mode)
    if(this.shouldSkipUpdate()) return

    const original_dt = dt
    if (dt > 200) {
      //  console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }

    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    const du = (dt / NOMINAL_UPDATE_INTERVAL);

    this.updateSimulation(du);

    prevUpdateDt = original_dt;
    prevUpdateDu = du;

    isUpdateOdd = !isUpdateOdd;
  }

  shouldSkipUpdate() {
    isUpdatePaused = !isUpdatePaused
    return isUpdatePaused && !step
  }

}
