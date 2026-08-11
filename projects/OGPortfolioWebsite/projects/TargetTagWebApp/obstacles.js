// Assume you have an array of obstacle types (e.g., rocks, spikes)
const obstacleTypes = ["rock", "spike", "pit"];

function spawnRandomObstacle() {
  const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
  const x = Math.random() * canvasWidth; // Choose a random x-coordinate
  const y = -obstacleHeight; // Start above the visible canvas
  const obstacle = createObstacle(obstacleType, x, y);
  obstacles.push(obstacle); // Store obstacles in an array
}

function updateObstacles() {
  for (const obstacle of obstacles) {
    obstacle.y += obstacleSpeed; // Move downward
    if (obstacle.y > canvasHeight) {
      // Recycle obstacle when it goes off-screen
      obstacle.y = -obstacleHeight;
      obstacle.x = Math.random() * canvasWidth;
    }
  }
}

// Call spawnRandomObstacle() periodically (e.g., every few seconds)
setInterval(spawnRandomObstacle, obstacleSpawnInterval);

// In your game loop, call updateObstacles() to move and recycle obstacles





// AI generated collision detection method
function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

// Example usage
const ball = { x: 100, y: 200, width: 20, height: 20 };
const obstacle = { x: 150, y: 180, width: 30, height: 30 };

if (isCollide(ball, obstacle)) {
  // Handle collision
  console.log("Collision detected!");
}

// More accurate method of collision detection especially when objects are transformed
function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}





//Sound Effects (SFX):
//Use the HTML5 <audio> element to handle sound effects.
//Create a new object constructor to manage sound objects. Here’s an example:
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function() {
    this.sound.play();
  };

  this.stop = function() {
    this.sound.pause();
  };
}

// Usage:
const mySound = new Sound("bounce.mp3");
mySound.play(); // Play the sound when needed





//Background Music:
//Similar to sound effects, create a new sound object for background music.
//Set the loop property to true to make the music repeat.
//Adjust the volume as needed.
const myMusic = new Sound("gametheme.mp3");
myMusic.play(); // Start playing background music when the game starts