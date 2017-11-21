class Bullet extends Entity {

  constructor(x, y, xVel) {
    super();

    let bulletImage = new Image();
    bulletImage.src = 'assets/model/wizard/explosion_blue.png';

    this.knight = GameManager.getInstance().sceneManager.getSceneByID('game').knight;

    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.sprite = new Sprite(bulletImage);
  }

  collidesWithKnight() {
    return Utils.collidesWithRectangleTopLeft(this.getEntityRectTopLeft(), this.knight.getEntityRectTopLeft());
  }

  update(du) {
    this.x = this.x + this.xVel * du;
  }

  render(ctx, xView, yView) {
    this.sprite.drawAtCenter(ctx, this.x - xView, this.y - yView);
  }
}
