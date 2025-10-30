let img;
let sound;
let amp;
let fft;
let rectangles = [];

function preload(){
  img = loadImage("assets/IMAGE1.jpg");
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  
  // Create scattered squares with same width/height but different sizes
  for (let i = 0; i < 5; i++) {
    let size = random(20, 80); // random size for each square
    rectangles.push({
      x: random(width),
      y: random(height),
      size: size  // same width and height = square
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
  
  // Draw squares - all same cyan color
  push();
  fill(0, 255, 255); // cyan color
  noStroke();
  
  for (let i = 0; i < rectangles.length; i++) {
    rect(rectangles[i].x, rectangles[i].y, rectangles[i].size, rectangles[i].size);
  }
  
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
