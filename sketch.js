let video;
let flippedVideo;
let classifier;
let label = '';
let prev_label = '';
let modelURL = 'https://teachablemachine.withgoogle.com/models/IlM9gGwBy/'

let partsys;

// Fruit
let active_fruit = [];
const INITIAL_FRUIT_FALL_SPEED = 1.1;
let fruit_fall_speed = INITIAL_FRUIT_FALL_SPEED;
let score = 0;

// Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);

  // Connect to the webcam
  video = createCapture(VIDEO);
  video.size(640, 520);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  
  // Start classifying
  classifyVideo();

  // Spawn a random fruit to begin with.
  spawnRandomFruit();

  partsys = new ParticleSystem(createVector(width/2, height/2));
}

function draw() {
  background(220);
  
  // Draw the video
  image(flippedVideo, 0, 0);
  
  // Draw the classifier label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height+20);

  // Draw and update the currently active fruit
  for (let i = 0; i < active_fruit.length; i++)
  {
    active_fruit[i].update(fruit_fall_speed);
    active_fruit[i].draw();

    // Remove fruit from the array (deleting them) when they go off the bottom of the canvas
    // and resetting the fruit fall speed to start off easy again.
    if (active_fruit[i].y_pos > height)
    {
      active_fruit.splice(i, i+1);
      fruit_fall_speed = INITIAL_FRUIT_FALL_SPEED;
      score = 0;
    }
  }

  partsys.run();

  // Draw the score on top of everything
  text(score, 20, 20);
}

function classifyVideo()
{
  // Calling the ml5 classify function on the video,
  // and calling the gotResults callback once the video
  // has been classified successfully.
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
  flippedVideo.remove();
}

function gotResults(error, results)
{
  if (error)
  {
    console.error(error);
    return;
  }
  if (results[0].label != label)
  {
    if (results[0].confidence > 0.96)
    {
      label = results[0].label;
      explodeFruit(label);
    }
  }
  
  // Continuing to classify the video again so that we can keep updating
  classifyVideo();
}

function explodeFruit(label)
{
  console.log("label is " + label);
  // Search for fruit of the type that you just held up,
  for (let i = 0; i < active_fruit.length; i++)
  {
    if (active_fruit[i].type === label)
    {
      // then spawn particles in the appropriate colour and position,
      let explosion_col = active_fruit[i].getColour();
      let explosion_pos = active_fruit[i].getPosition();
      partsys.addParticles(explosion_pos, explosion_col, 50);

      // then remove the fruit from the active_fruit array
      // and increment score
      active_fruit.splice(i, 1);
      score += 1;

      // then increase the fruit fall speed
      fruit_fall_speed *= 1.2;
      console.log("new fall speed is " + fruit_fall_speed);
    }
  }
  // for (let fruit of active_fruit)
  // {
  //   if (fruit.type == label)
  //   {
  //     // then spawn particles in the appropriate colour and position,
  //     let explosion_col = active_fruit[0].getColour();
  //     let explosion_pos = active_fruit[0].getPosition();
  //     partsys.addParticles(explosion_pos, explosion_col, 50);

  //     // then remove the fruit from the active_fruit array
  //     // and increment score
  //     active_fruit.shift();
  //     score += 1;

  //     // then increase the fruit fall speed
  //     fruit_fall_speed *= 1.2;
  //     console.log("new fall speed is " + fruit_fall_speed);
  //   }
  // }
}

function spawnRandomFruit()
{
  let fruitType = random([0, 1, 2, 3]);
  switch(fruitType)
  {
    case 0:
      active_fruit.push(new Carrot());
      break;
    case 1:
      active_fruit.push(new Banana());
      break;
    case 2:
      active_fruit.push(new Pepper());
      break;
    case 3:
      active_fruit.push(new Lime());
      break;
  }
  
  // Spawning another fruit (by calling self again) after a delay.
  const myTimeout = setTimeout(spawnRandomFruit, 2000);
}

function keyPressed()
{
  // Just for debugging.
  // Press down arrow to explode the last fruit.
  if (keyCode === DOWN_ARROW)
  {
    explodeFruit('Pepper');
  }
  else if (keyCode === UP_ARROW)
  {
    explodeFruit('Lime');
  }
  else if (keyCode === LEFT_ARROW)
  {
    explodeFruit('Carrot');
  }
  else if (keyCode === RIGHT_ARROW)
  {
    explodeFruit('Banana');
  }
}