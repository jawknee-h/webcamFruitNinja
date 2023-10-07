// Particle class just added for some extra juice and fun.
// Inspired by Daniel Shiffman's particle system code
// https://p5js.org/examples/simulate-particle-system.html

class Particle
{
    constructor(position, colour)
    {
        this.acceleration = createVector(0, 0.98);
        this.velocity = createVector(random(-5, 5), random(-5, 0));
        this.position = position.copy();
        this.lifespan = 255;
        this.colour = colour;
        this.scale = random(5, 15);
    }

    run()
    {
        this.update();
        this.draw();
    }

    update()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 1;
    }

    draw()
    {
        noStroke();
        fill(this.colour, this.lifespan);
        let radius = (this.lifespan/255)*this.scale;
        ellipse(this.position.x, this.position.y, radius, radius);
    }

    isDead()
    {
        return this.lifespan < 0;
    }    
}

class ParticleSystem
{
    constructor()
    {
        this.particles = [];
    }

    addParticle(origin, col)
    {
        this.particles.push(new Particle(origin, col));
    }

    addParticles(origin, col, num)
    {
        for (let i = 0; i < num; i++)
        {
            this.addParticle(origin, col);
        }
    }

    run()
    {
        // Running all particles in the particles array,
        // and removing dead particles from the array.
        for (let i = this.particles.length-1; i >= 0; i--)
        {
            this.particles[i].run();
            if (this.particles[i].isDead())
            {
                this.particles.splice(i, 1);
            }
        }
    }
}