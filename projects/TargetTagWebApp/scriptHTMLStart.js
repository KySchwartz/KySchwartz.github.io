// Set up the canvas when the window loads
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    canvas.width = screen.availWidth;
    canvas.height = screen.availHeight;
});

// Add functionality to the start button
document.getElementById('startbutton').addEventListener('click', function() {
    const game = document.querySelector('#game');

    const context = game.getContext('2d');
  
    game.height = screen.availHeight / 1.5;
  
    game.width = screen.availWidth - 100;
  
    let restartButton;
  
    var startTime, endTime;
  
    const keys = {};
  
    //Define the properties of the tractor
    const tractor = {
        x: (game.width / 20),
        y: (game.height * 1/2), 
        width: 16,
        height: 23.5,
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
          if (tractor.y + tractor.height*4 > game.height) {
            tractor.y -= 2;
          }
          else {
            tractor.y += 5;
          }
        }
    }

    // Add the functionality to move the tractor with the up and down arrows
    document.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (e.key === "ArrowUp") {
          //console.log("up arrow pressed");
          moveTractor(1);
          
        } else if (e.key === "ArrowDown") {
          //console.log("down arrow pressed");
          moveTractor(-1);

        } else if (e.key === "ArrowLeft") {
          //console.log("left arrow pressed");
        } else if (e.key === "ArrowRight") {
          //console.log("right arrow pressed");
        }
      });

      function animateGame() {
        let start = Date.now(); // remember start time

        stop = requestAnimationFrame(animateGame);

        context.clearRect(0,0, game.width, game.height);

        // Draw the image so it matches the object
        context.drawImage(tractorImg,tractor.x,tractor.y,200,100);
      }

      animateGame();
      
});




    /*// Grabbing sprite img
    const tractorImg = new Image();
    tractorImg.src = 'images/AC2.png';

    // Draw the image
    context.drawImage(tractorImg,game.width/4,game.height/2,200,100);
    */