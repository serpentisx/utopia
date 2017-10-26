/**
 * The main method that loads everthing
 * once the document is ready.
 */
(() => {

    "use strict";
    const gameManager = new GameManager();
    const controls = new Controls();
    gameManager.start();

})();
