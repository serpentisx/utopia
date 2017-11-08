/**
 * Enemy
 */
class Enemy {
	constructor(sprite, obj) {
		super();

		for (let prop in obj) {
			this[prop] = obj[prop];
		}
		this.sprite = sprite;
		this.rotation = 0;
	}

	render(ctx, xView, yView) {
		this.sprite.drawAtCenter(ctx, (this.x - this.sprite.width / 2) - xView, (this.y - this.sprite.height / 2) - yView);
	}
}