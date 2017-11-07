class UpdateManager {

  constructor(updater) {
    this.updater = updater;
    this.isUpdatePaused = false;
  }

  update(dt) {
    
    if (this.shouldSkipUpdate()) return;

    let original_dt = dt;
    if (dt > 200) {
      console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
      dt = NOMINAL_UPDATE_INTERVAL;
    }

		let du = (dt / NOMINAL_UPDATE_INTERVAL);

		//console.log(ctx.canvas.height)

    this.updater(du);
  }

  shouldSkipUpdate() {
    return this.isUpdatePaused;
  }
}
