class EntityManager extends SpatialManager {

  constructor() {
    super();
    this.KILL_ME_NOW  = -1;
  }

  createKnight(sprite, prop) {
    return this.registerEntity(new Knight(sprite, prop));
  }

  registerEntity(entity) {
    entity.spatialID = this.getNewSpatialID();
    this.entities.push(entity);
  }

  update(du) {
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      this.unregister(entity);

      if (entity.isDeadNow) {
        this.entities[i].splice(i--, 1);
        return;
      }
      entity.update(du);
      this.register(entity);
    }
  }

  render(ctx) {
    this.entities.forEach(entity => entity.render(ctx));
  }
}