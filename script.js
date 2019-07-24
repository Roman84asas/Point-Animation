(function(){
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight,
        particles = [],

        properties = {
            bgColor     : 'rgba(17, 17, 19, 1)',
            perticColor : 'rgba(225, 40, 40, 1)',
            particRadius: 3,
            particount  : 80,
            particSpeed : 0.5,
            lineLength  : 150,
            particLife  : 5,
        }

    document.querySelector('body').appendChild(canvas);

    window.onresize = function () {
        width = canvas.width = innerWidth,
        height = canvas.height = innerHeight;
    }

    class Anim{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.speedX = Math.random()*(properties.particSpeed*2)-properties.particSpeed;
            this.speedY = Math.random()*(properties.particSpeed*2)-properties.particSpeed;
            this.life = Math.random()*properties.particLife*60;
        }

        position(){
            this.x + this.speedX > w && this.speedX > 0 || this.x < 0 && this.speedX <0? this.speedX*=-1 : this.speedX;
            this.y + this.speedY > h && this.speedY > 0 || this.y < 0 && this.speedY <0? this.speedY*=-1 : this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;
        }

        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.perticColor;
            ctx.fill();
        }

        reCalcLife(){
            if(this.life < 1){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.speedX = Math.random()*(properties.particSpeed*2)-properties.particSpeed;
            this.speedY = Math.random()*(properties.particSpeed*2)-properties.particSpeed;
            this.life = Math.random()*properties.particLife*60;
            }

            this.life--;
        }
    }

    function reDrawBgr() {
        ctx.fillStyle = properties.bgColor,
        ctx.fillRect(0, 0, w, h);
    }

    function reDrawParticles() {
        for (let key in particles) {
            particles[key].reCalcLife();
            particles[key].position();
            particles[key].reDraw();
        }
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for(let i in particles){
            for(let j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength) {
                    ctx.lineWidth = '0,5';
                    ctx.strokeStyle = 'rgba(225, 40, 40, 1)';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        reDrawBgr();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for (let index = 0; index < properties.particount; index++) {
            particles.push(new Anim);
            
        }
        loop();
    }
    
    init();
}())