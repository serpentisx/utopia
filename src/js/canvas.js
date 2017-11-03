function initializeWindowListener() {
            // Register an event listener to
            // call the resizeCanvas() function each time 
            // the window is resized.
            window.addEventListener('resize', resizeCanvas, false);
            // Draw canvas border for the first time.
        }

        // Display custom canvas.
        // In this case it's a blue, 5 pixel border that 
        // resizes along with the browser window.                   
        function redraw() {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '5';
            ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
        }

        // Runs each time the DOM window resize event fires.
        // Resets the canvas dimensions to match window,
        // then draws the new borders accordingly.
        function resizeCanvas() {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            redraw();

        }
