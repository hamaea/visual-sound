let sound;
let play = false;

let amp;
let fft;

function preload() {
  sound = loadSound("assets/song01.mp3");
}
//hiiii
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // p5.Amplitude(); REF
  amp = new p5.Amplitude();

  //FFT(); REF
  fft = new p5.FFT();
}

function draw() {
  background(220);
  let level = amp.getLevel();
  console.log("Amplitude:", level);

  ellipse(width / 2, height / 2, level * 1000);

  //REF
  let spectrum = fft.analyze();
  console.log("First frequency value:", spectrum[0]);
  // spectrum is an array of amplitude values (0–255)

  //REF
  noStroke();
  fill(255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, width / spectrum.length, h);
  }
}

function mouseClicked() {
  if (play) {
    sound.pause();
    play = false;
  } else {
    sound.play();
    play = true;
    amp.setInput(sound); // ensure connected
    fft.setInput(sound);
  }
}
