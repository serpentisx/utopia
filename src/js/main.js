/**
 * The main method that loads everthing
 * once the document is ready.
 */
document.addEventListener("DOMContentLoaded", (e) => {

  "use strict";

  const gameManager = new GameManager()
  const controls = new Controls()
  gameManager.requestNextIteration()

});
