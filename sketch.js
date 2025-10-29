let sound;
let play = false;

function preload() {
  sound = loadSound("assets/song01.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  // background(220);
}

function mouseClicked() {
  if (play) {
    sound.pause(); // stop playing
    play = false;
    background('red');
  } else {
    sound.play(); // start playing
    play = true;
    background('green');
  }
}