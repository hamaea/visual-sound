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
  

  imageMode(CORNER);
  image(img, 0, 0, width, height);
  
  let level = amp.getLevel();
  let spectrum = fft.analyze();
  
  console.log("Amplitude:", level);
  console.log("First frequency value:", spectrum[0]);
  
  push();
  blendMode(DIFFERENCE);
  fill(255);
  
  for (let r of rectangles) {  
    rect(r.x, r.y, r.w, r.h);  
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
