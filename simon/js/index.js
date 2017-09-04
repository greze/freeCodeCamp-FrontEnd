var game = {
  count: 0,
  possibilities: ["#orange", "#yellow", "#blue", "#purple"],
  currentGame: [],
  player: [],
  sound: {
    orange: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  },
  hard: false
};

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function newGame() {
  clearGame();
}

function hard() {
  if (game.hard == false) {
    game.hard = true;
    $("#hard").css("background-color", "red");
  } else {
    game.hard = false;
    $("#hard").css("background-color", "transparent");
  }
  newGame();
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.CurrentGame.length) {
      clearInterval(moves);
    }
  }, 600);
  clearPlayer();
}

function sound(name) {
  switch (name) {
    case "#orange":
      game.sound.orange.play();
      break;
    case "#yellow":
      game.sound.yellow.play();
      break;
    case "#blue":
      game.sound.blue.play();
      break;
    case "#purple":
      game.sound.purple.play();
      break;
  }
}

function playGame(field) {
  switch (field) {
    case "#orange":
      $("#orange").css("background-color", "rgb(255, 153, 51)");
      break;
    case "#yellow":
      $("#yellow").css("background-color", "rgb(255, 255, 102)");
      break;
    case "#blue":
      $("#blue").css("background-color", "rgb(128, 255, 255)");
      break;
    case "#purple":
      $("#purple").css("background-color", "#BAD");
      break;
  }
  sound(field);
  setTimeout(function() {
    $(field).css("background-color", "transparent");
  }, 300);
}

function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  var field = "#" + id;
  console.log(field);
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (
    game.player[game.player.length - 1] !==
    game.currentGame[game.player.length - 1]
  ) {
    if (game.hard) {
      alert("You done goofed. Start over.");
      newGame();
    } else {
      alert("Wrong! Try again.");
      showMoves();
    }
  } else {
    console.log("Good on ya");
    sound(x);
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        alert("Winner!");
      } else {
        nextLevel();
      }
    }
  }
}

function nextLevel() {
  addCount();
}

function generateMove() {
  game.currentGame.push(game.possibilities[Math.floor(Math.random() * 4)]);
  showMoves();
}

function addCount() {
  game.count++;
  $("#counter").addClass("animated fadeOutDown");
  setTimeout(function() {
    $("#counter")
      .removeClass("fadeOutDown")
      .html(game.count)
      .addClass("fadeInDown");
  }, 200);
  generateMove();
}

$(document).ready(function() {
  $("#go").click(function() {
    $(this).css("background-color", "green");
    newGame();
  });

  $("#orange").mousedown(function() {
    $(this).css("background-color", "rgb(255, 153, 51)");
    $(this).mouseup(function() {
      $(this).css("background-color", "transparent");
    });
  });
  $("#yellow").mousedown(function() {
    $(this).css("background-color", "rgb(255, 255, 102)");
    $(this).mouseup(function() {
      $(this).css("background-color", "transparent");
    });
  });
  $("#blue").mousedown(function() {
    $(this).css("background-color", "rgb(128, 255, 255)");
    $(this).mouseup(function() {
      $(this).css("background-color", "transparent");
    });
  });
  $("#purple").mousedown(function() {
    $(this).css("background-color", "#BAD");
    $(this).mouseup(function() {
      $(this).css("background-color", "transparent");
    });
  });
});