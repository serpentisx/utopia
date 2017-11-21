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
    //Make zombies
    this.enemies.push(new Zombie(1200, 500));
    this.enemies.push(new Zombie(1827,493));
    this.enemies.push(new Zombie(632,1874));
    this.enemies.push(new Zombie(3983, 1869));
    this.enemies.push(new Zombie(4515, 1211));

    //Make orcs
    this.enemies.push(new Orc(1680, 1725));
    this.enemies.push(new Orc(632, 2261));
    this.enemies.push(new Orc(5275, 1757));
    this.enemies.push(new Orc(2339, 1752.5));
  }

  update(du) {
    this.knight.update(du);

    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      if (enemy.isDeadNow) {
        this.enemies.splice(i--, 1);
      }
      enemy.update(du);
    }
  }

  render(ctx, xView, yView) {
    this.knight.render(ctx, xView, yView);
    this.enemies.forEach(enemy => enemy.render(ctx, xView, yView));
  }
}
