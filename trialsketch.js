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
  
  // Auto-play the sound
  sound.loop();
  userStartAudio();
  
  // Create scattered squares with different sizes and speeds
  for (let i = 0; i < 5; i++) {
    let size = random(20, 80);
    rectangles.push({
      x: random(width),
      y: random(height),
      size: size,
      speedX: random(-0.5, 0.5), // slower horizontal speed
      speedY: random(-0.5, 0.5)  // slower vertical speed
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
  
  // Update and draw squares
  push();
  fill(0, 255, 255);
  noStroke();
  
  for (let i = 0; i < rectangles.length; i++) {
    // Move squares slowly
    rectangles[i].x += rectangles[i].speedX;
    rectangles[i].y += rectangles[i].speedY;
    
    // Wrap around screen edges
    if (rectangles[i].x > width) rectangles[i].x = 0;
    if (rectangles[i].x < 0) rectangles[i].x = width;
    if (rectangles[i].y > height) rectangles[i].y = 0;
    if (rectangles[i].y < 0) rectangles[i].y = height;
    
    // Draw square
    rect(rectangles[i].x, rectangles[i].y, rectangles[i].size, rectangles[i].size);
  }
  
  pop();
}
