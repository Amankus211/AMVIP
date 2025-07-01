const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesCount = 55; // Total number of particles on screen
const particlesToSpawn = 2; // Number of particles to spawn every interval
const particlesToRemove = 2; // Number of particles to remove every interval
const spawnInterval = 10000; // Time between spawning new particles (in milliseconds)
const connectionDistance = 100; // Distance within which particles are connected

let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 0.2 - 0.1; // Slower speed
        this.speedY = Math.random() * 0.2 - 0.1; // Slower speed
        this.color = 'black'; // Blue color
        this.creationTime = Date.now(); // Time when the particle was created
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initializeParticles() {
    // Initialize particles at random positions
    for (let i = 0; i < particlesCount; i++) {
        const xPos = Math.random() * canvas.width;
        const yPos = Math.random() * canvas.height;
        particlesArray.push(new Particle(xPos, yPos));
    }
}

function spawnParticles() {
    const now = Date.now();
    
    // Remove old particles if more than particlesCount
    if (particlesArray.length > particlesCount) {
        particlesArray.sort((a, b) => a.creationTime - b.creationTime);
        particlesArray.splice(0, particlesToRemove);
    }

    // Add new particles
    for (let i = 0; i < particlesToSpawn; i++) {
        const xPos = Math.random() * canvas.width;
        const yPos = Math.random() * canvas.height;
        particlesArray.push(new Particle(xPos, yPos));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    connectParticles();
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    // Draw connections between particles
    ctx.strokeStyle = 'black'; // Blue color for connections
    ctx.lineWidth = 1;

    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Initialize particles and start the animation
initializeParticles();
setInterval(spawnParticles, spawnInterval);
animateParticles();


