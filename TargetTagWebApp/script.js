
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
      gameMenu();
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

function gameMenu() {
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  let menu = document.querySelector('.menu');

  let difficulty = 1;
  let players = 1;

  let easyBtn = document.getElementById('easyBtn');
  let medBtn = document.getElementById('medBtn');
  let hardBtn = document.getElementById('hardBtn');

  let singlePlayBtn = document.getElementById('singlePlayBtn');
  let twoPlayBtn = document.getElementById('twoPlayBtn');
  let multiPlayBtn = document.getElementById('multiPlayBtn');

  let selectBtn = document.getElementById('select');

  // Setup menu scene
  context.clearRect(0,0, game.width, game.height);
  menu.style.display = 'block';

  // Assign actions to buttons
  easyBtn.addEventListener('click', () => {
    btnClicked(easyBtn);
    difficulty = 1;
  });

  medBtn.addEventListener('click', () => {
    btnClicked(medBtn);
    difficulty = 2;
  });

  hardBtn.addEventListener('click', () => {
    btnClicked(hardBtn);
    difficulty = 3;
  });

  singlePlayBtn.addEventListener('click', () => {
    btnClicked(singlePlayBtn);
    players = 1;
  });

  twoPlayBtn.addEventListener('click', () => {
    btnClicked(twoPlayBtn);
    players = 2;
  });

  multiPlayBtn.addEventListener('click', () => {
    btnClicked(multiPlayBtn);
    players = 3;
  });

  selectBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    startGame(difficulty, players);
  });

  // Changes the color of buttons after they are clicked
  function btnClicked(btn) {
    btn.style.backgroundColor = "green";
  }

}


// Function to start the game
function startGame(difficulty, players) {
    const game = document.querySelector('#game');

    const context = game.getContext('2d');
  
    game.height = window.innerHeight - 30;
  
    game.width = window.innerWidth - 30;

    let message = document.getElementById('message');

    let startBtn = document.getElementById('startBtn');

    let gameOverBtns = document.querySelector('.gameOverBtns');

    let replayBtn = document.getElementById('replay');

    let mainMenuBtn = document.getElementById('mainMenu');

    let pauseBtn = document.getElementById('pause');

    let moveUp;

    let moveDown;

    let moveLeft;

    let moveRight;

    let p2MoveUp;

    let p2MoveDown;

    let p2MoveLeft;

    let p2MoveRight;

    let playerScore = 0;

    let opponentScore = 0;

    let p2Score = 0;
  
    let wComputer = true;

    let multiPlayer = false;

    let paused = false;

    let isPlaying = false;

    // Handle the game mode selected
    if (players == 2) {
      wComputer = false;
    }
    if (players == 2 || players == 3) {
      multiPlayer = true;
    }

    // Clear the canvas
    context.clearRect(0,0, game.width, game.height);

    // Display and add functionality to the start button
    startBtn.style.display = "block";
    startBtn.addEventListener("click", () => {
      startTimer();
      isPlaying = true;
  });

    // Display the message box
    message.style.display = "block";
  
    //Define the properties of the tractor
    const tractor = {
        x: (game.width / 20),
        y: (game.height * 1/2), 
        width: 200,
        height: 100,
        speed: 5,
    };

    // Retrieve the image and place it into the canvas
    tractorImg = document.getElementById('tractor');
    context.drawImage(tractorImg,tractor.x,tractor.y,200,100);

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

// Define the AI opponent and draw the sprite
  //Define the properties of the opponent
  const opponent = {
    x: (game.width * 3/4),
    y: (game.height * 1/2), 
    width: 10,
    height: 5,
    speed: 2,
  };

  if (wComputer == false) {
    opponent.x = screen.availWidth + 100;
    opponent.y = screen.availHeight + 100;
  }
  
  if (wComputer == true) {
    // Retrieve the image and place it into the canvas
    opponentImg = document.getElementById('opponent');
    context.drawImage(opponentImg,opponent.x,opponent.y,200,100);
  }

  // Define the 2nd player and draw the sprite
   //Define the properties of the 2nd player
   const p2 = {
    x: (game.width / 20),
    y: (game.height * 1/4), 
    width: 200,
    height: 100,
    speed: 5,
};

if (multiPlayer == false) {
  p2.x = screen.availWidth + 100;
  p2.y = screen.availHeight + 100;
}

if (multiPlayer == true) {
  // Retrieve the image and place it into the canvas
  p2Img = document.getElementById('p2');
  context.drawImage(p2Img,p2.x,p2.y,150,100);
}

if (multiPlayer == true) {
  let joystick2 = document.querySelector('.joystick2')
  joystick2.style.display = 'block';
}

    // set the speed of the players and opponent
    if (difficulty == 1) {
      tractor.speed = 5;
      opponent.speed = 2;
      p2.speed = 5;
    } else if (difficulty == 2) {
      tractor.speed = 7;
      opponent.speed = 3;
      p2.speed = 7;
    } else if (difficulty == 3) {
      tractor.speed = 5;
      opponent.speed = 4;
      p2.speed = 5;
    }
function replay() {
  // Place the elements into a starting position in case the game is replayed
  message.innerHTML = "";
  playerScore = 0;
  opponentScore = 0;
  p2Score = 0;
  startBtn.style.display = "block";

  tractor.x = (game.width / 20);
  tractor.y = (game.height * 1/2);

  target.x = (game.width * 1/2);
  target.y = (game.height * 1/2);

  opponent.x = (game.width * 3/4);
  opponent.y = (game.height * 1/2);

  p2.x = (game.width / 20);
  p2.y = (game.height * 1/4);

  animateGame();
}

// This function performs the actual movement on the tractor
  function moveTractor(d) {
      
      // move the tractor up
      if (d == 1) {
        if (tractor.y < 0) {
          tractor.y += 2;
        }
        else {
          tractor.y -= tractor.speed;
        }
      }
      // move the tractor down
      else if (d == -1) {
        if (tractor.y + tractor.height > game.height) {
          tractor.y -= 2;
        }
        else {
          tractor.y += tractor.speed;
        }
      }
      // move the tractor left
      else if (d == -2) {
        if (tractor.x < 0) {
          tractor.x += 2;
        }
        else {
          tractor.x -= tractor.speed;
        }
      }
      // move the tractor right
      else if (d == 2) {
        if (tractor.x + tractor.width > game.width) {
          tractor.x -= 2;
        }
        else {
          tractor.x += tractor.speed;
        }
      }
  }

  // This function calls the moveTractor function based on variables
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

  // This function moves the opponent
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

  // Method to allow computer to play
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

  // This function calls the moveTractor function based on variables
  function moveP2() {
    if (p2MoveUp == true) {
      movementP2(1);
    }
    if (p2MoveDown == true) {
      movementP2(-1);
    }
    if (p2MoveLeft == true) {
      movementP2(-2);
    }
    if (p2MoveRight == true) {
      movementP2(2);
    }
  }

  function movementP2(d) {
      
    // move the tractor up
    if (d == 1) {
      if (p2.y < 0) {
        p2.y += 2;
      }
      else {
        p2.y -= p2.speed;
      }
    }
    // move the tractor down
    else if (d == -1) {
      if (p2.y + p2.height > game.height) {
        p2.y -= 2;
      }
      else {
        p2.y += p2.speed;
      }
    }
    // move the tractor left
    else if (d == -2) {
      if (p2.x < 0) {
        p2.x += 2;
      }
      else {
        p2.x -= p2.speed;
      }
    }
    // move the tractor right
    else if (d == 2) {
      if (p2.x + p2.width > game.width) {
        p2.x -= 2;
      }
      else {
        p2.x += p2.speed;
      }
    }
}

// ------ Code to allow user input starts here ------
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

    // Add the functionality to move the tractor with the up and down arrows
    document.addEventListener("keydown", (e) => {
      e = e || window.event;
      if (e.key === "w") {
        //console.log("up arrow pressed");
        moveUp = true;
        
      } else if (e.key === "s") {
        //console.log("down arrow pressed");
        moveDown = true;

      } else if (e.key === "a") {
        //console.log("left arrow pressed");
        moveLeft = true;

      } else if (e.key === "d") {
        //console.log("right arrow pressed");
        moveRight = true;
      }
    });

    // Add the functionality to move the tractor with the up and down arrows
  document.addEventListener("keyup", (e) => {
    e = e || window.event;
    if (e.key === "w") {
      //console.log("up arrow pressed");
      moveUp = false;
      
    } else if (e.key === "s") {
      //console.log("down arrow pressed");
      moveDown = false

    } else if (e.key === "a") {
      //console.log("left arrow pressed");
      moveLeft = false;

    } else if (e.key === "d") {
      //console.log("right arrow pressed");
      moveRight = false;
    }
  });

const controller = document.querySelector('.joystick');
const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
controller.style.display = "block";


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



const p2upButton = document.querySelector('.up2');
const p2downButton = document.querySelector('.down2');
const p2leftButton = document.querySelector('.left2');
const p2rightButton = document.querySelector('.right2');


p2upButton.addEventListener('touchstart', () => {
    p2MoveUp = true;
});

p2upButton.addEventListener('touchend', () => {
  p2MoveUp = false;
});

p2downButton.addEventListener('touchstart', () => {
  p2MoveDown = true;
});

p2downButton.addEventListener('touchend', () => {
  p2MoveDown = false;
});

p2rightButton.addEventListener('touchstart', () => {
  p2MoveRight = true;
});

p2rightButton.addEventListener('touchend', () => {
  p2MoveRight = false;
});

p2leftButton.addEventListener('touchstart', () => {
  p2MoveLeft = true;
});

p2leftButton.addEventListener('touchend', () => {
  p2MoveLeft = false;
});
// ------ Code for user input ends here ------>


// ------ Code for UI buttons starts here ------>
replayBtn.addEventListener('click', () => {
  gameOverBtns.style.display = 'none';
  replay();
  //startGame(difficulty, players);
  });

mainMenuBtn.addEventListener('click', () => {
  //gameOverBtns.style.display = 'none';
  message.innerHTML = "!! This feature is currently broken :( Please reload the page to return to the main menu !!"
  //message.style.display = 'none';
  //mainMenu();
  });

pauseBtn.addEventListener('click', () => {
  if (isPlaying == true) {
      togglePause();
    }
  });
// ------ Code for UI buttons ends here ------>

function togglePause() {
  paused = !paused;
  if (paused) {
      //animation.pause();
      IntervalManager(0);
      pauseBtn.innerHTML = "⏵"
  } else {
      //animation.play();
      IntervalManager(1);
      //statusLbl.setText("");
      pauseBtn.innerHTML = "||"
  }
}


// This prevents the browser from popping up dialog boxes when using touch controls
// In your JavaScript code:
self.oncontextmenu = function(e) {
  e.preventDefault(); // Prevent the default context menu
  // Your custom logic (if needed)
};


    // This function handles collisions
    function isCollide(a, b) {
      return !(
          (a.y + a.height) < b.y ||
          a.y > (b.y + b.height) ||
          (a.x + a.width) < b.x ||
          a.x > (b.x + b.width)
      );
    }

    // Keeps image sprites aligned with actual position of elements
      function animateGame() {
        //let start = Date.now(); // remember start time

        //stop = requestAnimationFrame(animateGame);

        context.clearRect(0,0, game.width, game.height);

        // Draw the image so it matches the object
        context.drawImage(tractorImg,tractor.x,tractor.y,200,100);
        context.drawImage(targetImg, target.x, target.y, 150, 75);
        if (wComputer == true) {
          context.drawImage(opponentImg, opponent.x, opponent.y, 150, 75);
        }
        if (multiPlayer == true) {
          context.drawImage(p2Img,p2.x,p2.y,150,100);
        }
        drawScore();
      }

      // draws the score
      function drawScore() {
        context.font = "16px Arial";
        context.fillStyle = "#0095DD";
        if (multiPlayer == true && wComputer == true) {
          context.fillText(`Player 1 Score: ${playerScore}   |   Player 2 Score: ${p2Score}  |  Opponent's Score: ${opponentScore}`, 8, 20);
        }
        else if (multiPlayer == true && wComputer == false) {
          context.fillText(`Player 1 Score: ${playerScore}   |   Player 2 Score: ${p2Score}`, 8, 20);
        }
        else {
          context.fillText(`Your Score: ${playerScore}   |   Opponent's Score: ${opponentScore}`, 8, 20);
        }
      }

      // allows a program to delay progression when used with an async function
      function sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
      }

      // Starts the timer
      function startTimer() {
        let countdown = 3; // Initial countdown value
        let startTime = null;
      
        // Updates the timer and displays the messages
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
                await sleep(1);
                //animateGame();
                //gameInterval = setInterval(gameLoop, 10);
                IntervalManager(1);
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

    // Handles the starting and stopping of the gameLoop
    async function IntervalManager(num) {
      //let gameInterval;
      let timer;
      if (num == 1) {
        gameInterval = window.setInterval(gameLoop, 10);
      }
      else if (num == 0) {
        await sleep(0.5);
        window.clearInterval(gameInterval);
      }
    }
      
    // function that repeats while game is active
    function gameLoop() {
      movePlayer();
      
      if (wComputer == true) {
      OpponentAI();
      }

      if (multiPlayer == true) {
        moveP2();
      }

      animateGame();

      //collisionDetection();
      if (isCollide(tractor, target)) {
        //console.log("Collision Detected");
        // move the target when it is hit
        target.x = Math.random() * (game.width - 100);
        target.y = Math.random() * (game.height - 200);
        playerScore += 1;
      };
      if (wComputer == true) {
        if (isCollide(opponent, target)) {
          //console.log("Collision Detected");
          // move the target when it is hit
          target.x = Math.random() * (game.width - 100);
          target.y = Math.random() * (game.height - 200);
          opponentScore += 1;
        };
      }
      if (multiPlayer == true) {
        if (isCollide(p2, target)) {
          //console.log("Collision Detected");
          // move the target when it is hit
          target.x = Math.random() * (game.width - 100);
          target.y = Math.random() * (game.height - 200);
          p2Score += 1;
        };
      }

      // Check score and output results
      if (playerScore == 20) {
        
        // Stop the game loop
        IntervalManager(0);
        gameOverBtns.style.display = "block";
        isPlaying = false;
        
        // Declare the winnre
        message.innerHTML = "Congratulations!  You Won!";
    }
    else if (opponentScore == 20) {
        
        // Stop the game loop
        IntervalManager(0);
        gameOverBtns.style.display = "block";
        isPlaying = false;
        
        // Declare the winner
        message.innerHTML = "You Lost. The Computer Won the Race This Time.";
    }
    else if (p2Score == 20) {
        
      // Stop the game loop
      IntervalManager(0);
      gameOverBtns.style.display = "block";
      isPlaying = false;
      
      // Declare the winner
      message.innerHTML = "Player 2 Won!";
  }
  }
}




//const upRight = document.querySelector('.upRight');
/*
upRight.addEventListener('touchstart', () => {
  moveUp = true;
  moveRight = true;
});

upRight.addEventListener('touchend', () => {
  moveUp = false;
  moveRight = false;
});*/
