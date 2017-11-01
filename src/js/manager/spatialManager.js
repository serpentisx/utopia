class SpatialManager {

  constructor() {
    this.entities = [];
    this.nextSpatialID = 1;
  }

  getNewSpatialID() {
    return this.nextSpatialID++;
  }

  register(entity) {
    this.entities.push(entity);
  }

  unregister(entity) {
    for (var i = 0; i < this.entities.length; i++) {
      if (this.entities[i].getSpatialID() === entity.getSpatialID()) {
        this.entities.splice(i, 1);
        break;
      }
    }
  }

  // Finds an entity that collides with @param entity
  findEntityInRange(entity) {
    for (var i = 0; i < this.entities.length; i++) {
      let p = this.entities[i].getPos();
      let ds = Utils.distSq(entity.getPos().x, entity.getPos().y, p.x, p.y) - (entity.getRadius() + this.entities[i].getRadius())**2;
      if (ds <= 0) {
        return this.entities[i];
      }
    }
  }

  render(ctx) {
    let oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (let ID in this.entities) {
      let e = this.entities[ID];
      let pos = e.getPos();
      Utils.strokeCircle(ctx, pos.x, pos.y, e.getRadius());
    }
    ctx.strokeStyle = oldStyle;
  }
}