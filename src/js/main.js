/**
 * The main method that loads everthing
 * once the document is ready.
 */
document.addEventListener("DOMContentLoaded", (e) => {

  "use strict";

  const controls = new Controls();

  //Set canvas size
  ctx.canvas.width  = window.innerWidth
  ctx.canvas.height = window.innerHeight

  const sceneManager = new SceneManager();

  sceneManager.createScene('menu', new MainMenu());

  sceneManager.createScene('game', new HollowKnightGame());

  sceneManager.setCurrentScene('menu');

  
  const gameManager = new GameManager(sceneManager);

  //Reset canvas width and height
  initializeWindowListener();


  gameManager.start();
});
