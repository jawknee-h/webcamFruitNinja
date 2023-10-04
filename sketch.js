let video;
let flippedVideo;
let classifier;
let label = '';
let prev_label = '';
let modelURL = 'https://teachablemachine.withgoogle.com/models/IlM9gGwBy/'

// Fruit
let active_fruit = [];
let fruit_fall_speed = 1.1;
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

    // Remove fruit from the array (deleting them) when they go off the bottom of the canvas.
    if (active_fruit[i].y_pos > height)
    {
      active_fruit.splice(i, i+1);
    }
  }

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
  prev_label = label;
  label = results[0].label;

  // If a new fruit has just been detected, destroy it.
  if (prev_label != label)
  {
    explodeFruit(label);
  }
  
  // Continuing to classify the video again so that we can keep updating
  classifyVideo();
}

function explodeFruit(label)
{
  console.log("label is " + label);
  for (let fruit of active_fruit)
  {
    if (fruit.type == label)
    {
      active_fruit.shift();
      score += 1;

      // Increasing the fruit fall speed
      fruit_fall_speed *= 1.2;
      console.log("new fall speed is " + fruit_fall_speed);
    }
  }
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