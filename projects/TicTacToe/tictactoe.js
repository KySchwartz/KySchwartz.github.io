// Kyle Schwartz
// 9/14/2023
// Multiplayer tic tac toe

// Declare variables for player 1 and gameEnded
let playerSymbol = "X";
let gameEnded = false;

// Use for loop and list to add event listener to grid
for (let i = 1; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener(
      "click", 
      function() {
        // If statement makes sure came has not ended and that the cell is empty
        if (this.innerHTML === "" && !gameEnded) {
            this.innerHTML = playerSymbol;
          

        // Add a class to the html element to style grid symbols
        this.classList.add(playerSymbol.toLowerCase("X"));

        // Check if the player has won
        checkWin();

        // Swaps symbol depending on if player just placed and X or O
        if (playerSymbol === "X")
          playerSymbol = "O"
        else
          playerSymbol = "X"  
        }    
      }
    );
  }

// List to store all possible winning positions
let winPos = [
    [1, 2, 3], [4, 5, 6], 
    [7, 8, 9], [1, 4, 7], 
    [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
  ];

// function to check for winners
function checkWin() {
    for (let i = 0; i < winPos.length; i++) {
        if (
            document.getElementById(winPos[i][0]).innerHTML === playerSymbol &&
            document.getElementById(winPos[i][1]).innerHTML === playerSymbol &&
            document.getElementById(winPos[i][2]).innerHTML === playerSymbol
          ) {
            document.getElementById(winPos[i][0]).classList.add("win");
            document.getElementById(winPos[i][1]).classList.add("win");
            document.getElementById(winPos[i][2]).classList.add("win"); 
            gameEnded = true;

            // Displays winner message
            if (playerSymbol == "X") {
                document.getElementById("winMsg").innerHTML = "X wins!";
            }
            else {
                document.getElementById("winMsg").innerHTML = "O wins!";
            } 
        }
    }

    // Conditional statement to handle ties
    if (document.getElementById("1").innerHTML != "" &&
        document.getElementById("2").innerHTML != "" &&
        document.getElementById("3").innerHTML != "" &&
        document.getElementById("4").innerHTML != "" &&
        document.getElementById("5").innerHTML != "" &&
        document.getElementById("6").innerHTML != "" &&
        document.getElementById("7").innerHTML != "" &&
        document.getElementById("8").innerHTML != "" &&
        document.getElementById("9").innerHTML != "" &&
        gameEnded == false) {
        document.getElementById("winMsg").innerHTML = "It's a tie!";
    }
}

// Event handler runs when reset button is clicked
document.getElementById("reset").addEventListener(
    "click", 
    function() {
        for (let i = 1; i <= 9; i++) {
            document.getElementById(i.toString()).innerHTML = "";
            document.getElementById("winMsg").innerHTML = "";
            document.getElementById(i.toString()).classList.remove("x");
            document.getElementById(i.toString()).classList.remove("o");
            document.getElementById(i.toString()).classList.remove("win");
            gameEnded = false;
          }
    }
  );
  