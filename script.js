class Ball {

    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = Math.random() * 5;
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