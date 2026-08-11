// Set up the canvas when the window loads
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    canvas.width = screen.availWidth;
    canvas.height = screen.availHeight;
})

// Add functionality to the start button
document.getElementById('startbutton').addEventListener('click', function() {
    const game = document.querySelector('#game');

    const context = game.getContext('2d');
  
    game.height = screen.availHeight;
  
    game.width = screen.availWidth;
  
    let restartButton;
  
    var startTime, endTime;
  
    const keys = {};
  
    const tractor = {
        x: (screen.availWidth * 1/2),
        y: (screen.availHeight * 1/2), 
        width: 16,
        height: 23.5,
    };

    tractorImg = document.getElementById('tractor');


    /*// Grabbing sprite img
    const tractorImg = new Image();
    tractorImg.src = 'images/AC2.png';

    // Draw the image
    context.drawImage(tractorImg,game.width/4,game.height/2,200,100);
    */

    context.drawImage(tractorImg,game.width/4,game.height/2,200,100);

    // Add the functionality to move the tractor with the up and down arrows
    document.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (e.key === "ArrowUp") {
          //console.log("up arrow pressed");
          tractor.y++;
          context.drawImage(tractorImg,tractor.x,tractor.y,200,100);
        } else if (e.key === "ArrowDown") {
          //console.log("down arrow pressed");
          tractor.y--;
          context.drawImage(tractorImg,tractor.x,tractor.y,200,100);
        } else if (e.key === "ArrowLeft") {
          //console.log("left arrow pressed");
        } else if (e.key === "ArrowRight") {
          //console.log("right arrow pressed");
        }
      });
});