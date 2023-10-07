class Fruit
{
    constructor(type)
    {
        this.type = type;
        this.x_pos = random(0, width);
        this.y_pos = -100;
        this.colour;
    }

    draw()
    {
    }

    update(fall_speed)
    {
        this.y_pos += fall_speed;
        if (this.y_pos > height)
        {
            this.explode();
        }
    }

    explode()
    {
        console.log("BOOM!");
    }

    getColour()
    {
        return this.colour;
    }

    getPosition()
    {
        return createVector(this.x_pos, this.y_pos);
    }
}

class Banana extends Fruit
{
    constructor()
    {
        super("Banana");
        this.colour = color(200, 200, 0);
    }
    
    draw()
    {
        push();

        rectMode(CENTER);
        stroke(0);
        fill(this.colour);
        rect(this.x_pos, this.y_pos, 50, 10);

        pop();
    }
}

class Pepper extends Fruit
{
    constructor()
    {
        super("Pepper");
        this.colour = color(200, 0, 0);
    }
    
    draw()
    {
        push();

        rectMode(CENTER);
        stroke(0);
        fill(this.colour);
        rect(this.x_pos, this.y_pos, 30, 30);

        pop();
    }
}

class Carrot extends Fruit
{
    constructor()
    {
        super("Carrot");
        this.colour = color(247, 146, 69);
    }
    
    draw()
    {
        push();

        rectMode(CENTER);
        stroke(0);
        fill(this.colour);
        rect(this.x_pos, this.y_pos, 70, 8);

        pop();
    }
}

class Lime extends Fruit
{
    constructor()
    {
        super("Lime");
        this.colour = color(65, 217, 68);
    }
    
    draw()
    {
        push();

        rectMode(CENTER);
        stroke(0);
        fill(this.colour);
        rect(this.x_pos, this.y_pos, 20, 20);

        pop();
    }
}