<html>
    <body>
        let player;
let obstacles = [];
let exit;
let winMessage = false;
const obstacleCount = 3;
const borderThickness = 15;
const exitSize = 30;

function setup() {
  createCanvas(400, 400);
  player = new Player();
  exit = createExit();
  createMovingObstacles(obstacleCount);
}

function draw() {
  background(220);
  drawBorder();

  if (winMessage) {
    displayWinMessage();
  } else {
    player.update();
    player.display();

    moveObstacles();
    displayObstacles();

    checkForWin();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move(0, -2);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 2);
  } else if (keyCode === LEFT_ARROW) {
    player.move(-2, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(2, 0);
  }
}

function mousePressed() {
  obstacles.push(new Obstacle(mouseX, mouseY, 30, color(random(255), random(255), random(255)), false));
}

function createMovingObstacles(count) {
  for (let i = 0; i < count; i++) {
    obstacles.push(new Obstacle(random(width), random(height), 30, color(random(255), random(255), random(255)), true));
  }
}

function moveObstacles() {
  for (let obstacle of obstacles) {
    obstacle.move();
  }
}

function displayObstacles() {
  for (let obstacle of obstacles) {
    obstacle.display();
  }
}

function createExit() {
  return {
    x: width - exitSize,
    y: height - exitSize,
    width: exitSize,
    height: exitSize
  };
}

function drawBorder() {
  noFill();
  stroke(10);
  strokeWeight(30);
  line(500, 0,0, 0);
  line(0, 500, 0,0);
  line(400,0,400,350);
  line(0,400,350,400)
}

function displayWinMessage() {
  textSize(48);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  text('You Win!!!!!!!', width / 2, height / 2);
}

function checkForWin() {
  if (
    player.x + player.size / 2 > width - exitSize &&
    player.x - player.size / 2 < width &&
    player.y + player.size / 2 > height - exitSize &&
    player.y - player.size / 2 < height
  ) {
    winMessage = true;
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
  }

  move(xDir, yDir) {
    this.x += xDir * 10;
    this.y += yDir * 10;
  }

  update() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    noStroke(); 
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor(x, y, size, col, isMoving) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.isMoving = isMoving;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  move() {
    if (this.isMoving) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x < 0) {
        this.x = width;
      } else if (this.x > width) {
        this.x = 0;
      }

      if (this.y < 0) {
        this.y = height;
      } else if (this.y > height) {
        this.y = 0;
      }
    }
  }

  display() {
    noStroke(); 
    fill(this.col);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

 
    </body>
/,</html>