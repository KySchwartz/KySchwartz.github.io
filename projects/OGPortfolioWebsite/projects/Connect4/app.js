// The basic functionality of this game was created by Ania Kubow and retrieved via GitHub
//Copyright (c) 2020 Ania Kubow
// Styles, animations, and the automatic selection of columns is the work of Kyle Schwartz
// 9/4/2024

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');
  let currentPlayer = 1;
  const columnHeights = Array(7).fill(0); // Initialize column heights

  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ]

  function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = squares[winningArrays[y][0]]
      const square2 = squares[winningArrays[y][1]]
      const square3 = squares[winningArrays[y][2]]
      const square4 = squares[winningArrays[y][3]]

      //check those squares to see if they all have the class of player-one
      if (
        square1.classList.contains('player-one') &&
        square2.classList.contains('player-one') &&
        square3.classList.contains('player-one') &&
        square4.classList.contains('player-one')
      )
      {
        square1.classList.add('winning');
        square2.classList.add('winning');
        square3.classList.add('winning');
        square4.classList.add('winning');
        
        result.innerHTML = 'Player One Wins!'
        result.style.color = "red";
        restartButton.style.display = "block";
        restartButton.style.color = "red";
      }
      //check those squares to see if they all have the class of player-two
      if (
        square1.classList.contains('player-two') &&
        square2.classList.contains('player-two') &&
        square3.classList.contains('player-two') &&
        square4.classList.contains('player-two')
      )
      {
        square1.classList.add('winning');
        square2.classList.add('winning');
        square3.classList.add('winning');
        square4.classList.add('winning');

        result.innerHTML = 'Player Two Wins!'
        result.style.color = "blue";
        restartButton.style.display = "block";
        restartButton.style.color = "blue";
      }
    }
  }

  function addFallingAnimation(squareIndex) {
    squares[squareIndex].classList.add('falling');
    setTimeout(() => {
      squares[squareIndex].classList.remove('falling');
    }, 500); // Adjust the duration as needed
  }

  function findLowestAvailableSquare(columnIndex) {
    for (let row = 5; row >= 0; row--) {
      const squareIndex = columnIndex + row * 7;
      if (!squares[squareIndex].classList.contains('taken')) {
        return squareIndex;
      }
    }
    return null; // Column is full
  }

  function isBoardFull() {
    // Check if all squares are taken
    return Array.from(squares).every(square => square.classList.contains('taken'));
  }


  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener('click', () => {
    // Clear the board (remove classes)
    squares.forEach(square => {
        square.classList.remove('taken', 'player-one', 'player-two', 'winning');
    });

    // Reset any other necessary variables (e.g., currentPlayer)
    currentPlayer = 1;
    displayCurrentPlayer.innerHTML = currentPlayer;

    // Clear the result message
    result.innerHTML = '';
    restartButton.style.display = "none";
  });

  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      const columnIndex = i % 7;
      const lowestSquareIndex = findLowestAvailableSquare(columnIndex);
      if (lowestSquareIndex !== null) {
        squares[lowestSquareIndex].classList.add('taken');
        squares[lowestSquareIndex].classList.add(currentPlayer === 1 ? 'player-one' : 'player-two');
        columnHeights[columnIndex]++; // Update column height
        currentPlayer = 3 - currentPlayer; // Toggle player (1 -> 2, 2 -> 1)
        displayCurrentPlayer.innerHTML = currentPlayer;
        checkBoard();
        addFallingAnimation(lowestSquareIndex); 
        if (isBoardFull()) {
          result.innerHTML = 'It\'s a draw! The board is full.';
          result.style.color = "purple";
          restartButton.style.display = "block";
          restartButton.style.color = "purple";
        }
      } else {
        alert('Column is full!');
      }
    };
  }
});

