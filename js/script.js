function GameBoard(){
  const row = 3
  const col = 3
  let board = [];

  for(let i = 0; i < row; i++){
    board[i] = [];
    for(let j = 0; j < col; j++){
      board[i].push(Cell());
    }
  }

  //for UI to render board
  const getBoard = () => board;

  const addMarker = (posX, posY, playerOption) => {
    const cellAvailable = board[posX][posY].getMarker() === '';
    
    if(!cellAvailable) return;
    board[posX][posY].changeMarker(playerOption);
  }
  
   //a method to show the board to the console after each turn that we play
   const printBoard = () => {
    boardWithCellValues = board.map(row => row.map(cell => cell.getMarker())); 
    console.log(boardWithCellValues);
  }
  return {getBoard, addMarker, printBoard };
}


// marker represents the symbols on the board
// '' represents no marker at that postion
// X represents the marker for player 1
// O represents the marker for player 2
function Cell(){
  let marker = '';

  const changeMarker = (playerMarker) => marker = playerMarker; 
  const getMarker = () => marker;

  return {changeMarker, getMarker};
}

function GameController(playerOneName="playerOne", playerTwoName="playerTwoName"){
  const board = GameBoard();
  const players = [{name: playerOneName, token: 'X'},{name:playerTwoName, token: 'O'}];
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  }

  const playRound = (row, col) => {
    console.log(`Place ${getActivePlayer().name}'s marker into row ${row} column ${col}...`);
    board.addMarker(row, col, getActivePlayer().token);
      
    // check for win here
    switchPlayerTurn();
    printNewRound();
  }
  // Initial game message
  printNewRound();

  return {playRound, getActivePlayer, getBoard: board.getBoard};
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer  = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares 
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        cellButton.textContent = cell.getMarker();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  function clickHandlerBoard(e){
    const selectedRow    = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    
    if(e.target.textContent === ''){
      game.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
    
  } 

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}

ScreenController();
