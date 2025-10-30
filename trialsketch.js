let video;
let sound;
let amp;
let fft;
let rectangles = [];
let level;
let spectrum;

function preload() {
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create video element
  video = createVideo("assets/trialvideo1.mov");
  video.hide(); // Hide the default HTML video element
  video.loop(); // Make it loop
  video.volume(0); // Mute the video (since you have your own audio)
  
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  
  // Create more scattered squares with different sizes and faster speeds
  for (let i = 0; i < 10; i++) {
    let size = random(20, 80);
    rectangles.push({
      x: random(width),
      y: random(height),
      size: size,
      speedX: random(-3, 3),
      speedY: random(-3, 3),
      sensitivity: random(0.5, 2)
    });
  }
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  // Draw video as background
  imageMode(CORNER);
  image(video, 0, 0, width, height);
  
  let level = amp.getLevel();
  let spectrum = fft.analyze();
  
  // Update and draw squares
  push();
  blendMode(DIFFERENCE);
  fill(255);
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].x += rectangles[i].speedX * (1 + level * 20);
    rectangles[i].y += rectangles[i].speedY * (1 + level * 20);
    
    if (rectangles[i].x > (width + 90)) rectangles[i].x = 0;
    if (rectangles[i].x < (0 - 90)) rectangles[i].x = width;
    if (rectangles[i].y > (height + 90)) rectangles[i].y = 0;
    if (rectangles[i].y < (0 - 90)) rectangles[i].y = height;
    
    rectangles[i].size = map(level * rectangles[i].sensitivity, 0, 0.3, 10, 120);
    
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
