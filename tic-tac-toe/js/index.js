// maybe be simplest to make an x version and o version

var board = [[null, null, null], [null, null, null], [null, null, null]];
var user, oMove;
function playerXOrO() {
  user = prompt("x or o? (lowercase only)", "x");
  if (user === "x") {
    oMove = false;
  } else if (user === "o") {
    oMove = true;
  }
}

function getWinner(board) {
  vals = [true, false];
  var allNotNull = true;
  for (var k = 0; k < vals.length; k++) {
    var value = vals[k];

    // check rows, columns and diagonals
    var diagonalComplete1 = true;
    var diagonalComplete2 = true;
    for (var i = 0; i < 3; i++) {
      if (board[i][i] != value) {
        diagonalComplete1 = false;
      }
      if (board[2 - i][i] != value) {
        diagonalComplete2 = false;
      }

      var rowComplete = true;
      var colComplete = true;
      for (var j = 0; j < 3; j++) {
        if (board[i][j] != value) {
          rowComplete = false;
        }
        if (board[j][i] != value) {
          colComplete = false;
        }
        if (board[i][j] == null) {
          allNotNull = false;
        }
      }
      if (rowComplete || colComplete) {
        return value ? 1 : 0;
      }
    }
    if (diagonalComplete1 || diagonalComplete2) {
      return value ? 1 : 0;
    }
  }
  if (allNotNull) {
    return -1;
  }
  return null;
}

function restartGame() {
  board = [[null, null, null], [null, null, null], [null, null, null]];
  playerXOrO();
  updateMove();
}

function updateMove() {
  updateButtons();
  var winner = getWinner(board);
  if (user === "x") {
    $("#winner").text(
      winner == 1 ? "o won" : winner == 0 ? "x won" : winner == -1 ? "tie" : ""
    );
  } else if (user === "o") {
    $("#winner").text(
      winner == 1 ? "x won" : winner == 0 ? "o won" : winner == -1 ? "tie" : ""
    );
  }
}

function updateButtons() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (user === "x") {
        $("#c" + i + "" + j).text(
          board[i][j] == true ? "o" : board[i][j] == false ? "x" : ""
        );
      } else if (user === "o") {
        $("#c" + i + "" + j).text(
          board[i][j] == false ? "x" : board[i][j] == true ? "o" : ""
        );
      }
    }
  }
}

// the alg

var numNodes = 0;

function recurseMinimax(board, player) {
  numNodes++;
  var winner = getWinner(board);
  if (winner != null) {
    switch (winner) {
      case 1:
        // o wins
        return [1, board];
      case 0:
        // x wins
        return [-1, board];
      case -1:
        // draw
        return [0, board];
    }
  } else {
    // next states
    var nextVal = null;
    var nextBoard = null;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] == null) {
          if (user === "x") {
            board[i][j] = player;
            var value = recurseMinimax(board, !player)[0];
            if (
              (player && (nextVal == null || value > nextVal)) ||
              (!player && (nextVal == null || value < nextVal))
            ) {
              nextBoard = board.map(function(arr) {
                return arr.slice();
              });
              nextVal = value;
            }
          } else if (user === "o") {
            board[i][j] = !player;
            var value = recurseMinimax(board, player)[1];
            if (
              (!player && (nextVal == null || value < nextVal)) ||
              (player && (nextVal == null || value > nextVal))
            ) {
              nextBoard = board.map(function(arr) {
                return arr.slice();
              });
              nextVal = value;
            }
          }
          board[i][j] = null;
        }
      }
    }
    return [nextVal, nextBoard];
  }
}

function makeMove() {
  board = minimaxMove(board);
  console.log(numNodes);
  if (user === "x") {
    oMove = false;
  } else if (user === "o") {
    oMove = true;
  }
  updateMove();
}

function minimaxMove(board) {
  numNodes = 0;
  return recurseMinimax(board, true)[1];
}

if (user === "x") {
  if (oMove) {
    makeMove();
  }
} else if (user === "o") {
  if (!oMove) {
    makeMove();
  }
}

$(document).ready(function() {
  playerXOrO();
  $("button").click(function() {
    var cell = $(this).attr("id");
    var row = parseInt(cell[1]);
    var col = parseInt(cell[2]);
    if (user === "x") {
      if (!oMove) {
        board[row][col] = false;
        oMove = true;
        updateMove();
        makeMove();
      }
    } else if (user === "o") {
      if (oMove) {
        board[row][col] = true;
        oMove = false;
        updateMove();
        makeMove();
      }
    }
  });
  $("#restart").click(restartGame);
});

updateMove();