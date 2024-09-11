
// Set up the canvas when the window loads
window.addEventListener('load', function(){
  mainMenu();
})

function mainMenu() {
const container = document.getElementById('canvas-container');
container.style.height = window.innerHeight;
container.style.width = window.innerWidth;

      // canvas setup
      const canvas = document.getElementById('game');
      const context = canvas.getContext('2d');
      canvas.width = window.innerWidth - 30;
      canvas.height = window.innerHeight - 30;
      document.getElementById('startBtn').style.display = "none";
  
  // Function to draw the background
  function drawStartBackground(){
    // Retrieve the image and place it into the canvas
    targetImg = document.getElementById('target');
    context.drawImage(startImage,0,0,window.innerWidth,window.innerHeight);
  }
  
  // Function to get the mouse position
  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
  
  // Function to check whether a point is inside a rectangle
  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
  }
  
  // The rectangle should have x,y,width,height properties
  var rect = {
    x: (this.window.innerWidth / 2) - 100,
    y: window.innerHeight / 2,
    width: 200,
    height: 100,
  };
  
  // Binding the click event on the canvas
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
  
    if (isInside(mousePos, rect)) {
      startGame();
    } else {
      // Enter action if clicked outside button area
    }
  }, false);
  
  // Question code
  function Playbutton(rect, lWidth, fillColor, lineColor) {
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = 'rgba(225,225,225,0.5)';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();
    context.closePath();
    context.font = '40pt Kremlin Pro Web';
    context.fillStyle = '#000000';
    context.fillText('Start', rect.x + rect.width / 4, rect.y + 64);
  }
  drawStartBackground();
  Playbutton(rect);
}


// Function to resize canvas if user changes window size currently resets game
/*function resizeCanvas() {
  const canvas = document.getElementById('game');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas(); */




// Function to start the game
function startGame() {
    const game = document.querySelector('#game');

    const context = game.getContext('2d');
  
    game.height = window.innerHeight - 30;
  
    game.width = window.innerWidth - 30;

    let message = document.getElementById('message');

    let startBtn = document.getElementById('startBtn');

    let moveUp;

    let moveDown;

    let moveLeft;

    let moveRight;

    let playerScore = 0;

    let opponentScore = 0;
  
    let restartButton;
  
    var startTime, endTime;
  
    const keys = {};

    startBtn.style.display = "block";
    startBtn.addEventListener("click", () => {
      startTimer();
  });
  
    //Define the properties of the tractor
    const tractor = {
        x: (game.width / 20),
        y: (game.height * 1/2), 
        width: 200,
        height: 100,
    };

    // Retrieve the image and place it into the canvas
    tractorImg = document.getElementById('tractor');
    context.drawImage(tractorImg,tractor.x,tractor.y,200,100);

    function moveTractor(d) {
        
        // move the tractor up
        if (d == 1) {
          if (tractor.y < 0) {
            tractor.y += 2;
          }
          else {
            tractor.y -= 5;
          }
        }
        // move the tractor down
        else if (d == -1) {
          if (tractor.y + tractor.height > game.height) {
            tractor.y -= 2;
          }
          else {
            tractor.y += 5;
          }
        }
        // move the tractor left
        else if (d == -2) {
          if (tractor.x < 0) {
            tractor.x += 2;
          }
          else {
            tractor.x -= 5;
          }
        }
        // move the tractor right
        else if (d == 2) {
          if (tractor.x + tractor.width > game.width) {
            tractor.x -= 2;
          }
          else {
            tractor.x += 5;
          }
        }
    }

    function moveOpponent(d) {
        
      // move the opponent up
      if (d == 1) {
          opponent.y -= opponent.speed;
      }
      // move the opponent down
      else if (d == -1) {
          opponent.y += opponent.speed;
      }
      // move the opponent left
      else if (d == -2) {
          opponent.x -= opponent.speed;
      }
      // move the opponent right
      else if (d == 2) {
          opponent.x += opponent.speed;
      }
  }

  // Method to move opponent ship
  function OpponentAI() {
    if (opponent.y > target.y) {
        moveOpponent(1);
    }
    else if (opponent.y < target.y) {
        moveOpponent(-1);
    }
    
    if (opponent.x > target.x) {
        moveOpponent(-2);
    }
    else if (opponent.x < target.x) {
        moveOpponent(2);
    }
}

    // Add the functionality to move the tractor with the up and down arrows
    document.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (e.key === "ArrowUp") {
          //console.log("up arrow pressed");
          moveUp = true;
          
        } else if (e.key === "ArrowDown") {
          //console.log("down arrow pressed");
          moveDown = true;

        } else if (e.key === "ArrowLeft") {
          //console.log("left arrow pressed");
          moveLeft = true;

        } else if (e.key === "ArrowRight") {
          //console.log("right arrow pressed");
          moveRight = true;
        }
      });

      // Add the functionality to move the tractor with the up and down arrows
    document.addEventListener("keyup", (e) => {
      e = e || window.event;
      if (e.key === "ArrowUp") {
        //console.log("up arrow pressed");
        moveUp = false;
        
      } else if (e.key === "ArrowDown") {
        //console.log("down arrow pressed");
        moveDown = false

      } else if (e.key === "ArrowLeft") {
        //console.log("left arrow pressed");
        moveLeft = false;

      } else if (e.key === "ArrowRight") {
        //console.log("right arrow pressed");
        moveRight = false;
      }
    });


    const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const upRight = document.querySelector('.upRight');

upButton.addEventListener('touchstart', () => {
    moveUp = true;
});

upButton.addEventListener('touchend', () => {
  moveUp = false;
});

downButton.addEventListener('touchstart', () => {
  moveDown = true;
});

downButton.addEventListener('touchend', () => {
moveDown = false;
});

rightButton.addEventListener('touchstart', () => {
  moveRight = true;
});

rightButton.addEventListener('touchend', () => {
moveRight = false;
});

leftButton.addEventListener('touchstart', () => {
  moveLeft = true;
});

leftButton.addEventListener('touchend', () => {
moveLeft = false;
});

upRight.addEventListener('touchstart', () => {
  moveUp = true;
  moveRight = true;
});

upRight.addEventListener('touchend', () => {
  moveUp = false;
  moveRight = false;
});

// In your JavaScript code:
self.oncontextmenu = function(e) {
  e.preventDefault(); // Prevent the default context menu
  // Your custom logic (if needed)
};


      function movePlayer() {
        if (moveUp == true) {
          moveTractor(1);
        }
        if (moveDown == true) {
          moveTractor(-1);
        }
        if (moveLeft == true) {
          moveTractor(-2);
        }
        if (moveRight == true) {
          moveTractor(2);
        }
      }

    //Define the properties of the target
    const target = {
      x: (game.width * 1/2),
      y: (game.height * 1/2), 
      width: 200,
      height: 100,
      status: 1,
  };

  // Retrieve the image and place it into the canvas
  targetImg = document.getElementById('target');
  context.drawImage(targetImg,target.x,target.y,200,100);

      //Define the properties of the opponent
      const opponent = {
        x: (game.width * 3/4),
        y: (game.height * 1/2), 
        width: 10,
        height: 5,
        speed: 2,
    };
  
    // Retrieve the image and place it into the canvas
    opponentImg = document.getElementById('opponent');
    context.drawImage(opponentImg,opponent.x,opponent.y,200,100);


      function isCollide(a, b) {
        return !(
            (a.y + a.height) < b.y ||
            a.y > (b.y + b.height) ||
            (a.x + a.width) < b.x ||
            a.x > (b.x + b.width)
        );
    }

      function animateGame() {
        let start = Date.now(); // remember start time

        stop = requestAnimationFrame(animateGame);

        context.clearRect(0,0, game.width, game.height);

        // Draw the image so it matches the object
        context.drawImage(tractorImg,tractor.x,tractor.y,200,100);
        context.drawImage(targetImg, target.x, target.y, 150, 75);
        context.drawImage(opponentImg, opponent.x, opponent.y, 150, 75);
        drawScore();
      }

      //animateGame();

      function drawScore() {
        context.font = "16px Arial";
        context.fillStyle = "#0095DD";
        context.fillText(`Your Score: ${playerScore}   |   Opponent's Score: ${opponentScore}`, 8, 20);
      }

      function sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
      }

      function startTimer() {
        let countdown = 3; // Initial countdown value
        let startTime = null;
      
        async function updateTimer(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }
      
            const elapsed = timestamp - startTime;
            const secondsLeft = Math.max(0, Math.ceil((3000 - elapsed) / 1000));
      
            if (secondsLeft === 0) {
                //context.clearRect(0, 0, game.width, game.height);
                //context.font = "24px Arial";
                //context.fillStyle = "green";
                //context.fillText("Go!", game.width / 2 - 20, game.height / 2);
                message.innerHTML = "Go!";
                await sleep(2);
                animateGame();
                setInterval(gameLoop, 10);
                startBtn.style.display = "none";
                message.innerHTML = "";
            } else {
                //context.clearRect(0, 0, game.width, game.height);
                //context.font = "24px Arial";
                //context.fillStyle = "black";
                //context.fillText(secondsLeft, game.width / 2 - 10, game.height / 2);
                message.innerHTML = secondsLeft;
                requestAnimationFrame(updateTimer);
            }
        }
      
        requestAnimationFrame(updateTimer);
        }
        //startTimer();
      
      // function that repeats while game is active
      function gameLoop() {
        movePlayer();
        OpponentAI();
        //collisionDetection();
        if (isCollide(tractor, target)) {
          //console.log("Collision Detected");
          // move the target when it is hit
          target.x = Math.random() * (game.width - 100);
          target.y = Math.random() * (game.height - 200);
          playerScore += 1;
        };
        if (isCollide(opponent, target)) {
          //console.log("Collision Detected");
          // move the target when it is hit
          target.x = Math.random() * (game.width - 100);
          target.y = Math.random() * (game.height - 200);
          opponentScore += 1;
        };
      }
      //setInterval(gameLoop, 10);
}




    /*// Grabbing sprite img
    const tractorImg = new Image();
    tractorImg.src = 'images/AC2.png';

    // Draw the image
    context.drawImage(tractorImg,game.width/4,game.height/2,200,100);
    */