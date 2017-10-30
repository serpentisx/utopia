/**
 * The main method that loads everthing
 * once the document is ready.
 */
document.addEventListener("DOMContentLoaded", function(e) {

  "use strict";

  const gameManager = new GameManager(hollowKnightGame);

  gameManager.start();

});
