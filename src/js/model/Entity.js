class Entity {

  constructor(spatialID) {
    this.spatialID = spatialID;
    this.isDeadNow = false;
  }

  kill() {
    this.isDeadNow = true;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getRadius() {
    return this.radius ? this.radius : 0;
  }

  getSpatialID() {
    return this.spatialID;
  }

  getPos() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

