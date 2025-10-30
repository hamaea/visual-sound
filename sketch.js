let img;
let sound;

let amp; //https://p5js.org/reference/p5.sound/p5.Amplitude/
let fft; //https://p5js.org/reference/p5.sound/p5.FFT/

let play = false;

function preload() {
  img = loadImage("assets/IMAGE2.jpg");
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(220);

  imageMode(CENTER);
  image(img, width / 2, height / 2);

  let level = amp.getLevel(); // overall loudness (0 → 1);
  let spectrum = fft.analyze(); // frequency array (0–255);

  console.log("Amplitude:", level);
  console.log("First frequency value:", spectrum[0]);

for (let i = 0; i < 20; i++) {
  // use fft to get random energy across spectrum
  let freq = spectrum[int(random(spectrum.length))];
  
  // map amplitude (loudness) to size
  let size = map(level, 0, 0.3, 10, 200);

  // random positions
  let x = random(width);
  let y = random(height);

  // color reacts to frequency value
  fill(freq, 255 - freq, 255, 150);
  noStroke();
  rect(x, y, size, size);
}
  
  // push();
  // blendMode(DIFFERENCE);
  // fill(255);
  // rect(width / 2, height / 2, 100, 100);
  // pop();
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
