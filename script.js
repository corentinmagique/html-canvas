class Ball {

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.speed = Math.random() * 0.5 + 0.5;

        this.xDirection = Math.random() > 0.5 ? 1 : -1;
        this.yDirection = Math.random() > 0.5 ? 1 : -1;
    } // constructor(x, y, radius, color)

    render(context) {
        context.beginPath();
        context.strokeStyle = this.color || '#fff';
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        context.stroke();
        context.closePath();
    } // render(context)

} // class Ball

document.addEventListener('DOMContentLoaded', function(e) {
    const canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) {
        console.error('Canvas not supported!');
        return;
    } // if
    const context = canvas.getContext('2d');

    context.fillStyle = '#0d0141ff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let balls = [];
    for (let i = 0; i < 50; i++) {
        let ball = new Ball(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 4 + 1,
            `hsl(${Math.random() * 360}, 100%, 75%)`
        );
        balls.push(ball);
    } // for

    function step() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#0d0141ff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        for (let star of balls) {
            star.x += star.speed * star.xDirection;
            star.y += star.speed * star.yDirection;
            if (star.x - star.radius < 0) star.xDirection = 1;
            if (star.x + star.radius > canvas.width) star.xDirection = -1;
            if (star.y - star.radius < 0) star.yDirection = 1;
            if (star.y + star.radius > canvas.height) star.yDirection = -1;
            star.render(context);
        } // for
        requestAnimationFrame(step);
    } // function step

    requestAnimationFrame(step);
});