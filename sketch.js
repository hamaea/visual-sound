function preload(){
  img = loadImage("assets/IMAGE1.jpg");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(220);
  
  imageMode(CENTER);
  image(img, width/2, height/2)

  push();
  blendMode(DIFFERENCE);
  fill(255);
  rect(width/2, height/2, 100, 100);
  pop();
  
}