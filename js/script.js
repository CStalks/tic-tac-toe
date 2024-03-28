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
  return {getBoard, addMarker, printBoard};
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

  const checkWin = () => {
    let updatedBoard = board.getBoard();
    
    if( (updatedBoard[0][0].getMarker() === 'X' && updatedBoard[0][1].getMarker() === 'X' && updatedBoard[0][2].getMarker() === 'X')    ||
        (updatedBoard[1][0].getMarker() === 'X' && updatedBoard[1][1].getMarker() === 'X' && updatedBoard[1][2].getMarker() === 'X')    ||
        (updatedBoard[2][0].getMarker() === 'X' && updatedBoard[2][1].getMarker() === 'X' && updatedBoard[2][2].getMarker() === 'X')    ||
        (updatedBoard[0][0].getMarker() === 'X' && updatedBoard[1][0].getMarker() === 'X' && updatedBoard[2][0].getMarker() === 'X')    ||
        (updatedBoard[0][1].getMarker() === 'X' && updatedBoard[1][1].getMarker() === 'X' && updatedBoard[2][1].getMarker() === 'X')    ||
        (updatedBoard[0][2].getMarker() === 'X' && updatedBoard[1][2].getMarker() === 'X' && updatedBoard[2][2].getMarker() === 'X')    ||
        (updatedBoard[0][0].getMarker() === 'X' && updatedBoard[1][1].getMarker() === 'X' && updatedBoard[2][2].getMarker() === 'X')    ||
        (updatedBoard[0][2].getMarker() === 'X' && updatedBoard[1][1].getMarker() === 'X' && updatedBoard[2][0].getMarker() === 'X')){
         return `${getActivePlayer().name} Won`;
    } else if((updatedBoard[0][0].getMarker() === 'O' && updatedBoard[0][1].getMarker() === 'O' && updatedBoard[0][2].getMarker() === 'O') ||
        (updatedBoard[1][0].getMarker() === 'O' && updatedBoard[1][1].getMarker() === 'O' && updatedBoard[1][2].getMarker() === 'O')    ||
        (updatedBoard[2][0].getMarker() === 'O' && updatedBoard[2][1].getMarker() === 'O' && updatedBoard[2][2].getMarker() === 'O')    ||
        (updatedBoard[0][0].getMarker() === 'O' && updatedBoard[1][0].getMarker() === 'O' && updatedBoard[2][0].getMarker() === 'O')    ||
        (updatedBoard[0][1].getMarker() === 'O' && updatedBoard[1][1].getMarker() === 'O' && updatedBoard[2][1].getMarker() === 'O')    ||
        (updatedBoard[0][2].getMarker() === 'O' && updatedBoard[1][2].getMarker() === 'O' && updatedBoard[2][2].getMarker() === 'O')    ||
        (updatedBoard[0][0].getMarker() === 'O' && updatedBoard[1][1].getMarker() === 'O' && updatedBoard[2][2].getMarker() === 'O')    ||
        (updatedBoard[0][2].getMarker() === 'O' && updatedBoard[1][1].getMarker() === 'O' && updatedBoard[2][0].getMarker() === 'O')){
          return `${getActivePlayer().name} Won`;
    } else {
      return false;
    }
  }

  const playRound = (row, col) => {
      if(checkWin()){
        return;
      }
      board.addMarker(row, col, getActivePlayer().token);
      switchPlayerTurn();
      printNewRound();
  }

  // Initial game message
  printNewRound();

  return {playRound, getActivePlayer, getBoard: board.getBoard, checkWin};
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if(game.checkWin()){
      playerTurnDiv.textContent = `${activePlayer.name} Won`;
    } else {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    }


    // Render board squares 
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        cellButton.textContent = cell.getMarker();
        boardDiv.appendChild(cellButton);
      });
    });
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