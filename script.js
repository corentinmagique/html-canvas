document.addEventListener('DOMContentLoaded', function(e) {
    const canvas = document.getElementById('canvas');
    if (!canvas || !canvas.getContext) {
        console.error('Canvas not supported!');
        return;
    } // if
    const context = canvas.getContext('2d');
    // context.fillStyle = 'rgba(255, 0, 0, 0.75)';
    // context.fillRect(0, 0, 30, 30);

    // context.fillStyle = 'rgba(0, 255, 0, 0.75)';
    // context.fillRect(30, 30, 30, 30);

    // context.fillStyle = 'rgba(0, 0, 255, 0.75)';
    // context.fillRect(15, 15, 30, 30);

    // context.strokeStyle = '#fff';
    // context.strokeRect(0, 0, 60, 60);

    // context.clearRect(15, 15, 15, 15);
    // context.clearRect(30, 30, 15, 15);

    // context.beginPath();
    // context.strokeStyle = 'rgba(0, 0, 255, 0.75)';
    // context.arc(30, 30, 15, 0, Math.PI*2, true);
    // context.stroke();
    // context.fillStyle = '#fff';
    // context.fill();
    // context.closePath();

    const count = 60;

    // for (let i = 1; i <= count; i++) {
    //     context.beginPath();
    //     let posX = i * 10; let posY = 30;
    //     let ratio = i / count;
    //     console.log(i, ratio, (Math.PI*2) * ratio);
    //     context.arc(posX, posY, 5, 0, (Math.PI*2) * ratio, false);
    //     context.stroke();
    //     context.closePath();
    // } // for

    let i = 1;
    function step() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        
        let posX = 30; let posY = 30;
        let ratio = i / count;
        context.arc(posX, posY, 15, 0, (Math.PI*2) * ratio, false);
        if (i > count + 1) {
            i = 1;
            context.fillStyle = `hsl(${Math.random() * 360}, 100%, 75%)`;
            context.fill();
        } // if
        context.stroke();
        context.closePath();
        i++;
        requestAnimationFrame(step);
    } // function step
    requestAnimationFrame(step);


});