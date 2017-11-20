class EntityManager {

  constructor() {
    this.enemies = [];
    this.knight;
  }

  createKnight(x, y) {
    this.knight = new Knight(x, y);
    return this.knight;
  }

  createEnemies() {
    this.enemies.push(new Zombie(1200, 500));
    this.enemies.push(new Orc(100, 500));
  }

  update(du) {
    this.knight.update(du);
    this.enemies.forEach(enemy => enemy.update(du));
  }

  render(ctx, xView, yView) {
    this.knight.render(ctx, xView, yView);
    this.enemies.forEach(enemy => enemy.render(ctx, xView, yView));
  }
}
