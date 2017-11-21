class Wizard extends Entity {

  constructor(x, y) {
    super();

    this.sprite = new WizardSprite(this);
    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;
    this.entityManager = GameManager.getInstance().sceneManager.getSceneByID('game').entityManager;

    this.lives = 150;
    this.isIdle = true;
    this.isAttacking = false;
    this.isDead = false;

    this.x = x;
    this.y = y;
    this.spanRange = canvas.width;
    this.dirX = 0;

    this.walkSpeed = 5;
    this.velY = 0;
    this.attackRange = 1;

    this.awakeRange = {
      x: 1200,
      y: 800
    };

    this.bullets = [];
    this.projectiles = [];

    this.bullets.push(new Bullet(this.x, this.y, -5));

    this.attackBulletRate = 2000 / NOMINAL_UPDATE_INTERVAL;
    this.attackProjectileRate = 1500 / NOMINAL_UPDATE_INTERVAL;
  }

  handleCollisionsWithPlatform(du) {
    const halfWidth = this.sprite.width / 2;
    const halfHeight = this.sprite.height / 2;

    let collisions = this.detectCollisionsWithPlatform();

    let offSet = 3;

    if (collisions["left"]) {
      this.x = halfWidth + collisions["left"].x + collisions["left"].w + offSet;
    }
    if (collisions["right"]) {
      this.x = collisions["right"].x - halfWidth - offSet;
    }
    if (collisions["top"]) {
      this.velY = 0.01;
      this.y = halfHeight + collisions["top"].y + collisions["top"].h;
    }
    if (collisions["bottom"] && this.velY > 0) {
      this.velY = 0;
      this.y = collisions["bottom"].y - halfHeight + 1;
    }
  }

  collidesWithKnight() {
    return Utils.collidesWithRectangleTopLeft(this.getAttackOffsetRect(), this.knight.getEntityRectTopLeft());
  }

  getAttackOffsetRect() {
    let offset = 18;
    return {
      x: this.x - offset * this.dirX - this.sprite.width / 2,
      y: this.y - this.sprite.height / 2,
      w: this.sprite.width,
      h: this.sprite.height
    }
  }

  /**
   * Make the Zombie follows and attack the knight automatically
   */
  autoMovement(du) {
    if (this.isDead) return;
  }

  /**
   * Check if the zombie is dead
   */
   checkDeath() {
     if(this.lives <= 0) {
       this.isDead = true;
     }
   }

  doBulletAttack(du) {
    if (this.attackBulletRate < 0) {
      this.isIdle = false;
      this.isAttacking = true;
      this.isBulletAttack = true;
      this.attackBulletRate = (1500 + Math.random() * 4000) / NOMINAL_UPDATE_INTERVAL;
    }

    this.attackBulletRate -= du;
  }

  doProjectileAttack(du) {
    if (this.attackProjectileRate < 0) {
      this.isIdle = false;
      this.isAttacking = true;
      this.isProjectTileAttack = true;
      this.attackProjectileRate = (1000 + Math.random() * 2000) / NOMINAL_UPDATE_INTERVAL;
    }

    this.attackProjectileRate -= du;
  }

  collidesWithKnight() {
    return Utils.collidesWithRectangleTopLeft(this.getEntityRectTopLeft(), this.knight.getEntityRectTopLeft());
  }

  checkHits() {
    let collision = this.collidesWithKnight();
    if (collision && this.knight.isAttacking) {
      if (this.knight.facingDirection == collision) {
        this.lives--;
        if (this.knight.x < this.x) {
          this.x += 5;
        } else {
          this.x -= 5;
        }
      }
    }
  }

  attackWithBullet() {
     this.bullets.push(new Bullet(this.x + this.dirX * this.sprite.width/2, this.y, 5 * this.dirX));
  }

  attackWithProjectile() {
    let velX = 2 + Math.random() * 2;
    let velY = 8 + Math.random() * 8;
    this.projectiles.push(new Projectile(this.x + this.dirX * this.sprite.width/2, this.y, velX, -velY));
  }

  updateBullets(du) {
     for (let i = 0; i < this.bullets.length; i++) {
       this.bullets[i].update(du);

       if (this.bullets[i].isCollisionWithPlatform()) {
         this.bullets.splice(i--, 1);
         return;
       }

       if (this.bullets[i].collidesWithKnight()) {
         this.bullets.splice(i--, 1);
         this.knight.health.lifePoints--;
       }
     }
  }

  updateProjectiles(du) {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update(du);

      if (this.projectiles[i].isCollisionWithPlatform()) {
        let x = this.projectiles[i].x;
        let y = this.projectiles[i].y;

        if (Math.random() < 0.5) {
          this.entityManager.createOrc(x, y);
        }
        else {
          this.entityManager.createZombie(x, y);
        }

        this.projectiles.splice(i--, 1);
      }
    }
  }

  renderBullets(ctx, xView, yView) {
     this.bullets.forEach(bullet => bullet.render(ctx, xView, yView));
  }

  renderProjectiles(ctx, xView, yView) {
    this.projectiles.forEach(projectile => projectile.render(ctx, xView, yView));
  }

  updateDirection() {
     this.knight.x > this.x ? this.dirX = 1 : this.dirX = -1;
  }

  update(du) {
    if (!this.isAttacking) {
      this.isIdle = true;
    }

    const diffXabs = Math.abs(this.knight.x - this.x),
      diffYabs = Math.abs(this.knight.y - this.y);

    if(this.awakeRange.x > diffXabs && this.awakeRange.y > diffYabs) {
      this.doBulletAttack(du);
      this.doProjectileAttack(du);
    }

    this.applyGravity(du);
    this.handleCollisionsWithPlatform(du);
    this.handleBoundary();

    this.updateDirection();

    this.checkHits();
    this.checkDeath();

    this.updateBullets(du);
    this.updateProjectiles(du);

  }

  render(ctx, xView, yView) {
      this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
      this.renderBullets(ctx, xView, yView);
      this.renderProjectiles(ctx, xView, yView);
  }


}
