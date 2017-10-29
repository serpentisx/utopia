function UpdateManager(updater) {
  this.updater = updater;

  this.KEY_PAUSE = 'P'.charCodeAt(0);
  this.KEY_STEP = 'O'.charCodeAt(0);

  this.isUpdatePaused = false;
  this.NOMINAL_UPDATE_INTERVAL = 16.666;
  this.prevUpdateDt = null;
  this.prevUpdateDu = null;
  this.isUpdateOdd = false;
}

UpdateManager.prototype.update = function(dt) {
  if (this.shouldSkipUpdate()) return;

  let original_dt = dt;
  if (dt > 200) {
    console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
    dt = this.NOMINAL_UPDATE_INTERVAL;
  }

  let du = (dt / this.NOMINAL_UPDATE_INTERVAL);

  this.updater(du);

  this.prevUpdateDt = original_dt;
  this.prevUpdateDu = du;

  this.isUpdateOdd = !this.isUpdateOdd;
};

UpdateManager.prototype.shouldSkipUpdate = function() {
  if (eatKey(this.KEY_PAUSE)) {
    this.isUpdatePaused = !this.isUpdatePaused;
  }
  return this.isUpdatePaused && !eatKey(KEY_STEP);
};