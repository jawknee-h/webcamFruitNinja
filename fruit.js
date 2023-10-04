class Fruit
{
    constructor(type)
    {
        this.type = type;
        this.x_pos = random(0, width);
        this.y_pos = 100;
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
}

class Banana extends Fruit
{
    constructor()
    {
        super("Banana");
    }
    
    draw()
    {
        rectMode(CENTER);
        fill(200, 200, 0);
        rect(this.x_pos, this.y_pos, 50, 10);
    }
}

class Pepper extends Fruit
{
    constructor()
    {
        super("Pepper");
    }
    
    draw()
    {
        rectMode(CENTER);
        fill(200, 0, 0);
        rect(this.x_pos, this.y_pos, 30, 30);
    }
}

class Carrot extends Fruit
{
    constructor()
    {
        super("Carrot");
    }
    
    draw()
    {
        rectMode(CENTER);
        fill(247, 146, 69);
        rect(this.x_pos, this.y_pos, 70, 8);
    }
}

class Lime extends Fruit
{
    constructor()
    {
        super("Lime");
    }
    
    draw()
    {
        rectMode(CENTER);
        fill(65, 217, 68);
        rect(this.x_pos, this.y_pos, 20, 20);
    }
}