class Projectile extends Entity {

  constructor(x, y, xVel, yVel) {
    super();

    let bulletImage = new Image();
    bulletImage.src = 'assets/model/wizard/explosion_red.png';

    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;

    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;

    this.sprite = new Sprite(bulletImage);

    this.gravity = 0.2;
  }

  collidesWithKnight() {
    return Utils.collidesWithRectangleTopLeft(this.getEntityRectTopLeft(), this.knight.getEntityRectTopLeft());
  }

  applyGravity(du) {
    let finalVelY = this.yVel + this.gravity * du,
      avgVelY = (this.yVel + finalVelY) / 2,
      dPosY = avgVelY * du;

    this.y += dPosY;
    this.yVel = finalVelY;
  }

  update(du) {
    this.x = this.x + this.xVel * du;
    this.applyGravity(du);
  }

  render(ctx, xView, yView) {
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
  }
}
