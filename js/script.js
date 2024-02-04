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
    const cellAvailable = board[posX][posY].getMarker() === 0;
    
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

let here = GameBoard();

// marker represents the symbols on the board
// 0 represents no marker at that postion
// 1 represents the symbol X at that positon
// 2 represents the symbol O  at that position
function Cell(){
  let marker = 0;

  const changeMarker = (playerMarker) => marker = playerMarker; 
  const getMarker = () => marker;

  return {changeMarker, getMarker};
}

function GameController(playerOneName="playerOne", playerTwoName="playerTwoName"){
  return {};
}

