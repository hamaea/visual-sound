let img;
let sound;
let amp;
let fft;
let rectangles = [];

let level;
let spectrum;

function preload() {
  img = loadImage("assets/trialvideo1.mov");
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  // Create more scattered squares with different sizes and faster speeds
  for (let i = 0; i < 10; i++) {
    let size = random(20, 80);
    rectangles.push({
      x: random(width),
      y: random(height),
      size: size,
      speedX: random(-3, 3), // faster horizontal speed
      speedY: random(-3, 3),  // faster vertical speed
      sensitivity: random(0.5, 2)
    });
  }
rectMode(CENTER);
}

function draw() {
  background(220);

  // Fit image to full screen
  imageMode(CORNER);
  image(img, 0, 0, width, height);

  let level = amp.getLevel(); // overall loudness (0 → 1);
  let spectrum = fft.analyze(); // frequency array (0–255);

  console.log("Amplitude:", level);
  console.log("First frequency value:", spectrum[0]);

  // Update and draw squares
  push();
  blendMode(DIFFERENCE);
  fill(255);

  for (let i = 0; i < rectangles.length; i++) {
    // Move squares faster
    rectangles[i].x += rectangles[i].speedX * (1 + level * 20);
    rectangles[i].y += rectangles[i].speedY * (1 + level * 20);

    // Wrap around screen edges
    if (rectangles[i].x > (width + 90)) rectangles[i].x = 0;
    if (rectangles[i].x < (0 - 90)) rectangles[i].x = width;
    if (rectangles[i].y > (height + 90)) rectangles[i].y = 0;
    if (rectangles[i].y < (0 - 90)) rectangles[i].y = height;

    rectangles[i].size = map(level * rectangles[i].sensitivity, 0, 0.3, 10, 120);

    // Draw square
    rect(rectangles[i].x, rectangles[i].y, rectangles[i].size, rectangles[i].size);
  }

  pop();
}

function mouseClicked() {
  userStartAudio(); //https://p5js.org/reference/p5/userStartAudio/
  if (sound.isPlaying()) {
    sound.pause(); // pause if currently playing
  } else {
    // restart from the beginning & loop automatically
    sound.stop();
    sound.loop();
  }
}
