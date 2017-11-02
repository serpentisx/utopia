/**
 * The main method that loads everthing
 * once the document is ready.
 */
document.addEventListener("DOMContentLoaded", (e) => {

  "use strict";
  
  const controls = new Controls();

  const hollowKnightGame = new HollowKnightGame();
  const gameManager = new GameManager(hollowKnightGame);

  gameManager.start();
});
