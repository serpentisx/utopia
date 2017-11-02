class UpdateManager {

  constructor(updater) {
    this.updater = updater;
    this.NOMINAL_UPDATE_INTERVAL = 16.666;
    this.isUpdatePaused = false;
  }

  update(dt) {
    
    if (this.shouldSkipUpdate()) return;

    let original_dt = dt;
    if (dt > 200) {
      console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
      dt = this.NOMINAL_UPDATE_INTERVAL;
    }

    let du = (dt / this.NOMINAL_UPDATE_INTERVAL);
    this.updater(du);
  }

  shouldSkipUpdate() {
    return this.isUpdatePaused;
  }
}
