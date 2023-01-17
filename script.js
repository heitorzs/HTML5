const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArr = [];
let hue = 0;

window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.arc(100, 50, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%,50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

/* function init() {
    for (let i = 0; i < 100; i++) {
        particlesArr.push(new Particle());
    }
} */

/* init(); */

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 30; i++) {
        particlesArr.push(new Particle())
    }
})

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        particlesArr.push(new Particle())
    }
})

function handleParticles() {
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();
        for (j = i; j < particlesArr.length; j++) {
            const dx = particlesArr[i].x - particlesArr[j].x;
            const dy = particlesArr[i].y - particlesArr[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArr[i].color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
                ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
                ctx.stroke();
            }

        }
        if (particlesArr[i].size <= 0.3) {
            particlesArr.splice(i, 1);
            i--
        }
    }
}

function animate() {
    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //ctx.fillStyle = 'rgba(0,0,0,0.1)'; 
    //ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles();
    requestAnimationFrame(animate);
    hue++;

}
animate()