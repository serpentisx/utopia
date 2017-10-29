/**
 * The main method that loads everthing
 * once the document is ready.
 */
(() => {

    "use strict";

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const renderManager = new RenderManager(renderSimulation);
    const updateManager = new UpdateManager(updateSimulation);
    const gameManager = new GameManager(ctx, renderManager, updateManager);

    gameManager.start();



    // Functions for game logic

    function renderSimulation(ctx) {
		    //console.log("rendering");
    }

    function updateSimulation(du) {
        //console.log("updating");
    }

})();
