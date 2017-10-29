/**
 * The main method that loads everthing
 * once the document is ready.
 */
document.addEventListener("DOMContentLoaded", function(e) {

  "use strict";

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const hollowKnightGame = new HollowKnightGame(ctx);
  const gameManager = new GameManager(hollowKnightGame);

  gameManager.start();

});
