class Ball {

    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;

        this.speed = 0;
        this.bounce = 0.8 - ((this.radius / 5) * 0.31);
    } // constructor(canvas)

    render(context) {
        context.beginPath();
        context.fillStyle = this.color || '#fff';
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
    } // render(context)

} // class Ball

document.addEventListener('DOMContentLoaded', function(event) {
    const canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) {
        console.error('Canvas not supported!');
        return;
    } // if
    const context = canvas.getContext('2d');

    context.fillStyle = '#0d0141ff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let balls = [];

    let g = 9.81;
    g /= 60; // on divise par 60 pour simuler 60fps

    let t = null;
    let mouseX, mouseY;
    canvas.addEventListener('mousemove', function(event) {
        const {x, y} = event;
        mouseX = x, mouseY = y;
    });

    canvas.addEventListener('mousedown', function(event) {
        t = setInterval(function() {
            const ball = new Ball(canvas);
            ball.x = mouseX;
            ball.y = mouseY;
            balls.push(ball);
        }, 100);
    });

    ['mouseleave', 'mouseup'].forEach(e => {
        canvas.addEventListener(e, function() {
            if (t) clearInterval(t);
        });
    });
    
    function step() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#0d0141';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const cellSize = 50;

        const cols = Math.ceil(canvas.width / cellSize);
        const rows = Math.ceil(canvas.height / cellSize);

        let grid = {};
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (!grid[i]) grid[i] = {};
                grid[i][j] = [];
            } // for
        } // for

        for (let ball of balls) {
            const minX = Math.floor((ball.x - ball.radius) / cellSize);
            const maxX = Math.floor((ball.x + ball.radius) / cellSize);
            const minY = Math.floor((ball.y - ball.radius) / cellSize);
            const maxY = Math.floor((ball.y + ball.radius) / cellSize);

            for (let x = Math.max(0, minX); x <= Math.min(cols-1, maxX);x++) {
                for (let y = Math.max(0, minY); y <= Math.min(rows-1, maxY);y++) {
                    console.log(x, y)
                    grid[x][y].push({x, y});
                } // for
            } // for
        } // for

        // Debug affichage grille
        for (let i = 0; i < grid.length; i++) {
            context.beginPath();
            context.strokeStyle = 'rgba(255, 0, 0, 0.26)';
            context.moveTo(i * 50, 0);
            context.lineTo(i * 50, canvas.height);
            context.moveTo(0, i * 50);
            context.lineTo(canvas.width, i * 50);
            context.stroke();
            context.closePath();
            
            for (let j = 0; j < grid[i].length; j++) {
                let currentCell = grid[i][j];
                if (currentCell.length > 0) {
                    context.fillStyle = '#da2afd18';
                    for (let dx = -1; dx < 2;dx++) {
                        for (let dy = -1; dy < 2;dy++) {
                            if (dx == 0 && dy == 0) continue;
                            let idx = i+dx, jdy = j+dy;
                            if (grid[idx][jdy] && grid[idx][jdy].length > 0) {
                                for (let b of grid[idx][jdy]) {
                                    b.color = "red";
                                } // for
                            } // if
                        } // for
                    } // for
                } // if
            } // for
        } // for

        for (let ball of balls) {
            ball.speed += g;
            ball.speed *= 0.99; // friction
            ball.y += ball.speed;
            let groundY = canvas.height - ball.radius;
            if (ball.y > groundY) {
                ball.y = groundY;
                ball.speed = -ball.speed * ball.bounce;
            } // if ... else
            ball.render(context);
        } // for
        requestAnimationFrame(step);
    } // function step

    requestAnimationFrame(step);
});