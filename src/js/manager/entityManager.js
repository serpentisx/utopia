class EntityManager extends SpatialManager {

  constructor() {
    super();
    this.KILL_ME_NOW = -1;
  }

  createKnight(sprite, prop) {
    this.sprite = sprite
    return this.registerEntity(new Knight(sprite, prop));
  }

  registerEntity(entity) {
    entity.spatialID = this.getNewSpatialID();
    this.entities.push(entity);
    return entity;
  }

  update(du) {
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      this.unregister(entity);
      if (entity.isDeadNow) {
        this.entities[i].splice(i--, 1);
        return;
      }

      // kind of done for the knight as there are no other entities right now
      entity.update(du);
      // entity.update(du);

      this.register(entity);
    }
  }

  render(ctx, xView, yView) {
    this.entities.forEach(entity => entity.render(ctx, xView, yView));
  }
}
