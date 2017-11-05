class Map {

	constructor(mapImage) {
		this.sprite = mapImage;
		this.width = this.sprite.width;
		this.height = this.sprite.height;
	}

	render(ctx, xView, yView) {
		//context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
		var sx, sy, dx, dy;
		var sWidth, sHeight, dWidth, dHeight;

		// Offset point to crop image	
		sx = xView;
		sy = yView;

		// dimensions of cropped image
		sWidth = ctx.canvas.width;
		sHeight = ctx.canvas.height;

		//Check if cropped image is smaller than canvas
		if(this.sprite.width - sx < sWidth) {
			sWidth = this.sprite.width - sx;
		} 

		if(this.sprite.height - sy < sHeight) {
			sHeight = this.sprite.height - sy;
		}

		// location on canvas to draw the cropped image
		dx = 0;
		dy = 0;

		// match destination with source to not scale the image
		dWidth = sWidth;
		dHeight = sHeight;

		this.sprite.drawAt(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
}




