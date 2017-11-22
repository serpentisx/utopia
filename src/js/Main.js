/**
 * The main method that loads everything
 * once the document is ready.
 */

window.onload = function () {
	//Set canvas size
  ctx.canvas.width  = window.innerWidth
  ctx.canvas.height = window.innerHeight

  const sceneManager = new SceneManager();

  sceneManager.createScene('menu', new MainMenu());

  sceneManager.createScene('game', new HollowKnightGame());

  sceneManager.setCurrentScene('menu');


  const gameManager = new GameManager(sceneManager);
	const controls = new Controls();

	gameManager.requestNextIteration();
};
