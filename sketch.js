let img;
let sound;
let amp; 
let fft;

function preload() {
  img = loadImage("assets/IMAGE2.jpg");
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  amp.setInput(sound);
  fft.setInput(sound);
}

function draw() {
  background(0); // darker so shapes pop

  imageMode(CENTER);
  image(img, width / 2, height / 2);

  // get sound data?
  const level = amp.getLevel();            // ~0.000–0.05 
  const spectrum = fft.analyze();          // 0–255 per bin

  // make size actually visible; clamp result
  const sizeBase = map(level, 0, 0.05, 8, 220, true);

  noStroke();
  // draw a guaranteed visible test rect
  fill(255, 0, 0); 
  rect(20, 20, 30, 30);

  // sound-reactive rectangles
  for (let i = 0; i < 20; i++) {
    const freq = spectrum[int(random(spectrum.length))]; // 0–255

    const x = random(width);
    const y = random(height);
    const s = sizeBase; // use amplitude for size

    // use freq to drive color; full opacity for now
    fill(freq, 255 - freq, 255);
    rect(x, y, s, s);
  }
}

function mouseClicked() {
  userStartAudio(); // required for autoplay policies
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    // restart from beginning and loop forever
    sound.stop();
    sound.loop();

    // re-attach
    amp.setInput(sound);
    fft.setInput(sound);
  }
}
