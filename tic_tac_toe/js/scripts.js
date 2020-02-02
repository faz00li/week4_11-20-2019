

// // ***** PLAYER *****
// function Player(mark) {
//   this.mark = mark;
// }
//
// /*  UNIT TESTS
//     player1 - x
//     player2 - O
// */
// Player.prototype.getMark = function() {
//   return this.mark;
// }
//
// /*  UNIT TESTS
//     player1 - 3
//     player2 - 6
// */
// Player.prototype.getWinningCondition = function() {
//   return this.winCon;
// }
//
// Player.prototype.markSquare = function(square, board) {
//   board[square] =
//
// }
// Game.prototype.initializeGame = function() {
  //
  //   this.gameOver = false;
  //
  //   // var player1 = new Player("X", 3);
  //   // var player2 = new Player("O", 6);
  //   // this.players.push(player1);
  //   // this.players.push(player2);
  //
  //   this.whoseTurn = 1;
  //
  //   this.board = new Board;
  // }

// ***** BOARD *****
function Board() {
  this.board = new Array(9),
  this.winConditions = new Array(8);
}
Board.prototype.updateWinConditions = function() {
  // rows
  var w0 = this.board[0] + this.board[1] + this.board[2];
  var w1 = this.board[3] + this.board[4] + this.board[5];
  var w2 = this.board[6] + this.board[7] + this.board[8];

  // columns
  var w3 = this.board[0] + this.board[3] + this.board[6];
  var w4 = this.board[1] + this.board[4] + this.board[7];
  var w5 = this.board[2] + this.board[5] + this.board[8];

  // diag
  var w6 = this.board[0] + this.board[4] + this.board[8];
  var w7 = this.board[2] + this.board[4] + this.board[6];

  this.winConditions = [w0, w1 ,w2, w3, w4, w5, w6, w7];
}
Board.prototype.checkWinConditions = function(whoseTurn) {

console.log("whoseTurn: " + whoseTurn);
var winCheck = (whoseTurn + 1) * 3;
console.log("winCheck: " + winCheck);

  this.updateWinConditions();
  console.log("updated win conditions");
  this.printWinConditions();


  for(var i = 0; i < this.winConditions.length; i++) {
    console.log("win condition " + i + ": " + this.winConditions[i]);

    if (this.winConditions[i] === (winCheck) ) {
      console.log("win condition: " + i + " with value: " + this.winConditions[i] + " matches winCheck w/ value: " + winCheck  );
      return true;
    }
  }

  console.log('here2');
  return false;
}
Board.prototype.markSquare = function (squareId, whoseTurn) {
  this.board[squareId] = whoseTurn + 1;
}
Board.prototype.printBoard = function() {
  var boardContent = "";
  for(var i = 0; i < this.board.length; i++)
    boardContent += i +":" + "(" + this.board[i]+ ") ";
  console.log(boardContent);
}
Board.prototype.printWinConditions = function() {
  var winConditionsContent = "";
  for(var i = 0; i < this.winConditions.length; i++)
    winConditionsContent += i +":" + "(" + this.winConditions[i]+ ") ";
  console.log(winConditionsContent);
}
Board.prototype.clearBoard = function() {
  for(var i = 0; i < this.board.length; i++)
    this.board[i] = -100;
}

// ***** GAME *****
function Game() {
  this.gameOver = false,
  this.whoseTurn = 0,
  this.board = new Board(),
  this.turnCounter = 1
  // var players = [];
}
Game.prototype.setGame = function() {
  this.board.clearBoard();
}
Game.prototype.takeTurn = function(squareId) {
  this.board.markSquare(squareId, this.whoseTurn);

  console.log("GAME OVER: " + this.gameOver);
  this.gameOver = this.board.checkWinConditions(this.whoseTurn);
  console.log("GAME OVER: " + this.gameOver);

  if(this.whoseTurn === 0)
    this.whoseTurn = 1;
  else
    this.whoseTurn = 0;

  this.board.printBoard();
}
Game.prototype.checkIfMarked = function(squareId) {

  if (this.board.board[squareId] === 1){
    return true;
  }

  else if(this.board.board[squareId] === 2) {
    return true;
  }

  else {
    return false;
  }
}
Game.prototype.printBoard = function() {
  this.board.printBoard();
}

// ***** USER INTERFACE LOGIC *****
var t = new Game();
t.setGame();

$(document).ready(function() {

      $(".square").click(function(event){

      var squareId = event.target.id;
      var squareIdInterface = "#" + squareId;

      console.log("ONCLICK -- " + "player: " + t.whoseTurn + " clicked on: " + squareId + " game over: " + t.gameOver + " turnCounter: " + t.turnCounter + " square is marked: " + t.checkIfMarked(squareId) );

      if(t.checkIfMarked(squareId) == false) {
        if(t.whoseTurn === 0) {
          $(squareIdInterface + " h1.markerO").remove();
          $(squareIdInterface + " h1.markerX").show();
          t.takeTurn(squareId);
        }
        else if(t.whoseTurn === 1) {
          $(squareIdInterface + " h1.markerX").remove();
          $(squareIdInterface + " h1.markerO").show();
          t.takeTurn(squareId);
        }
      }
      else
        console.log("square taken, choose another");
    });//click
    
});//ready
