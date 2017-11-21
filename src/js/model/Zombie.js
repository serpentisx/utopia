class Zombie extends Entity {

  constructor(x, y) {
    super();

    this.sprite = new ZombieSprite();
    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;

    this.lives = 3;
    this.isIdle = true;
    this.isAttacking = false;
    this.isDead = false;

    this.x = x;
    this.y = y;
    this.spanRange = 800;
    this.dirX = 0;

    this.walkSpeed = 5;
    this.velY = 0;
    this.attackRange = 7;

    this.awakeRange = {
      x: 700,
      y: this.y / this.attackRange
    };

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
    const diffX = this.knight.x - this.x;

    let collidesWithKnight = this.collidesWithKnight();

    //Follow
    if( Math.abs(diffX) > this.walkSpeed * du && !collidesWithKnight) {
      //Move x direction
      if( diffX > 0) {
        this.isIdle = false;
        this.dirX = 1;
        this.x += this.walkSpeed*du;
      }else {
        this.isIdle = false;
        this.dirX = -1;
        this.x -= this.walkSpeed*du;
      }
    }

    if(collidesWithKnight) {
        this.isIdle = false;
        this.isAttacking = true;
        this.knight.health.depleteLifePoints();
    }

  }

  /**
   * Check if the zombie is dead
   */
   checkDeath() {
     if(this.lives <= 0) {
       //console.log("zombie is dead");
       this.kill();
     }
   }

  update(du) {
    if(!this.isDeadNow) {
      this.isIdle = true;
      this.isAttacking = false;
      const diffXabs = Math.abs(this.knight.x - this.x),
            diffYabs = Math.abs(this.knight.y - this.y);

      this.applyGravity(du);

      if(this.awakeRange.x > diffXabs && this.awakeRange.y > diffYabs) {
        this.autoMovement(du);
      }

      this.handleCollisionsWithPlatform(du);
      //Check lives
      if(this.collidesWithKnight() && this.knight.isAttacking) {
        this.lives--;
        if(this.knight.x < this.x) {
          this.x += 50;
        } else {
          this.x -= 50;
        }
      }
      this.handleBoundary();
      this.checkDeath();
    }
  }

  render(ctx, xView, yView) {
    if(!this.isDeadNow) {
      this.sprite.render(ctx, this.x - xView, this.y - yView, this.dirX, this.isAttacking, this.isIdle, this.isDead);
    }
  }


}
