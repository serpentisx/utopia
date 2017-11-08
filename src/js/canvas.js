function initializeWindowListener() {
            // Register an event listener to
            // call the resizeCanvas() function each time 
            // the window is resized.
            window.addEventListener('resize', resizeCanvas, false);
            // Draw canvas border for the first time.
        }
        
        // Runs each time the DOM window resize event fires.
        // Resets the canvas dimensions to match window,
        // then draws the new borders accordingly.
        function resizeCanvas() {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        }

