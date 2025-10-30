let img;
let sound;
let amp;
let fft;
let play = false;
let rectangles = [];

function preload(){
  img = loadImage("assets/IMAGE1.jpg");
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  
  // Create scattered rectangles with random positions and sizes
  for (let i = 0; i < 15; i++) {
    rectangles.push({
      x: random(width),
      y: random(height),
      w: random(50, 150),
      h: random(50, 150)
    });
  }
}

function draw() {
  background(220);
  
  // Fit image to full screen
  imageMode(CORNER);
  image(img, 0, 0, width, height);
  
  let level = amp.getLevel();
  let spectrum = fft.analyze();
  
  // Draw rectangles with stronger visibility
  push();
  blendMode(DIFFERENCE);
  fill(255, 255, 0); // Try yellow instead of white
  noStroke();
  
  for (let i = 0; i < rectangles.length; i++) {
    rect(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h);
  }
  
  pop();
  
  // TEST: Draw one bright rectangle to confirm drawing works
  push();
  fill(255, 0, 0); // Bright red, no blend mode
  rect(100, 100, 100, 100);
  pop();
}

function mouseClicked() {
  userStartAudio();
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.stop();
    sound.loop();
  }
}
