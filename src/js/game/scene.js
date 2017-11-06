class Scene {
	constructor() {
		this.isPaused = false;
	}

	getNextScene() {
		this.shouldChange = false;
		return this.nextScene;
	}

	pause() {
		this.isPaused = true;
	}

	resume() {
		this.isPaused = false;
	}
 
	isPaused() {
		return this.isPaused;
	}

	update() {
		if(!this.isPaused) {
				//Do we need this
		}
	}

	render(ctx) {
		this.render(ctx);
	}
}