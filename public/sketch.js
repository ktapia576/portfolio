// 0 = empty; 1 = X; -1 = O;
let board = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

let ai = 1;
let human = -1;

let w;
let h;

// Game States
let winner = null;  // If there is winner game ends
let currentPlayer = ai;

function setup() {
  createCanvas(400, 400);

  w = width / 3;  // get width divided into three parts
  h = height / 3;  // get height divided into three parts

  firstMove();  // random first move for ai
  noLoop();
}

function firstMove() {
  let row = Math.floor(Math.random() * 3); // returns a random integer from 0 to 2 
  let col = Math.floor(Math.random() * 3);

  board[row][col] = ai;
        
  redraw();

  currentPlayer = human;
}

function mouseClicked() {
  if (currentPlayer == human && winner === null) {
    // Only when human's turn is up
    let row = Math.floor(mouseY/h);  // Divide the mouse position in y axis by h and apply floor to get col index in array
    let col = Math.floor(mouseX/w);  // Divide the mouse position in x axis by w and apply floor to get row index in array

    // If turn is valid (space not filled) and the user didnt click outside canvas
    if (row < 3 && col < 3 && board[row][col] == 0) {
      board[row][col] = human;
      
      //Check if move wins
      checkWinner(); 
      redraw();
      
      if(winner === null) {
        currentPlayer = ai;
        aiMove();
      }
    }
  }
}

function checkWinner() {
  // Check Horizontal
  for (let i = 0; i < 3; i++) {
    // Add up row to see if winner. -3 means O wins. +3 means X wins. neither means no one wins
    let total = board[i][0] + board[i][1] + board[i][2];

    switch(total) {
      case -3:
        winner = "human";
        break;
      case 3:
        winner = "ai";
    }
  }

  // Check Vertical
  for (let i = 0; i < 3; i++) {
    // Add up row to see if winner. -3 means O wins. +3 means X wins. neither means no one wins
    let total = board[0][i] + board[1][i] + board[2][i];

    switch(total) {
      case -3:
        winner = "human";
        break;
      case 3:
        winner = "ai";
    }
  }

  // Check Diagnols
  let diagnol1 = board[0][0] + board[1][1] + board[2][2];
  let diagnol2 = board[0][2] + board[1][1] + board[2][0];

  switch(diagnol1) {
    case -3:
      winner = "human";
      break;
    case 3:
      winner = "ai";
  }

  switch(diagnol2) {
    case -3:
      winner = "human";
      break;
    case 3:
      winner = "ai";
  }

  // Check if Tie. If there is 0, there is open spot left. (Multiply all nums)
  let counter = 0;
  let openSpots;

  for (let i = 0; i < 3; i++) {
    let num = board[i][0] * board[i][1] * board[i][2];

    if(num !== 0) {
      counter++;
    }
  }
  if(counter === 3) {
    openSpots = false;
  }

  // return results
  if(winner === null && openSpots === false) {
    winner = "tie";
  } 
}

function draw() {
  background(255);
  strokeWeight(3);
  
  // Create grid lines for tic tac toe
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // *(0,0) starts at top right corner of canvas*
      let x = w * j + w/2;  // move x pointer based off of col number. Lastly, add half of w to move pointer center
      let y = h * i + h/2;  // move y pointer based off of row number Lastly, add half of h to move pointer center
      
      let mark = board[i][j];
    
      // 1 = X; -1 = O;
      if (mark == 1) {
        let r = w/4;  // divide into 4 parts and use for creating the lines
        line(x - r, y - r, x + r, y + r);  // move pointer to make line using xr (x1,y1,x2,y2) 
        line(x + r, y - r, x - r, y + r);
      } else if (mark == -1) {
        noFill();
        ellipse(x,y,w/1.6);
      }
    }
  }

  if(winner !== null) {
    console.log(winner);
  }
}