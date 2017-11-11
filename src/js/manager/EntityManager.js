class EntityManager extends SpatialManager {

  constructor() {
    super();
    this.KILL_ME_NOW = -1;
  }

  createKnight(prop) {
    return this.registerEntity(new Knight(prop));
  }

  registerEntity(entity) {
    entity.spatialID = this.getNewSpatialID();
    this.entities.push(entity);
    return entity;
  }

  update(du) {
    for (let i = 0; i < this.entities.length; i++) {
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

  render(ctx, xView, yView) {
    this.entities.forEach(entity => entity.render(ctx, xView, yView));
  }
}
