$(document).ready(function() {
  var workTime = parseInt($("#working").html());
  var relaxTime = parseInt($("#chilling").html());

  $("#clock").click(function() {
    var counter = setInterval(timer, 1000);
    workTime *= 60;
    relaxTime *= 60;
    function timer() {
      workTime -= 1;
      if (workTime === 0) {
        alert("Finished! Time to chill.");
        clearInterval(counter);
        var startRelax = setInterval(relaxTimer, 1000);
      }
      if (workTime % 60 >= 10) {
        $("#working").html(Math.floor(workTime / 60) + ":" + workTime % 60);
      } else {
        $("#working").html(
          Math.floor(workTime / 60) + ":" + "0" + workTime % 60
        );
      }

      function relaxTimer() {
        relaxTime -= 1;
        if (relaxTime === 0) {
          clearInterval(startRelax);
          alert("Finished! Time to work.");
        }
        if (relaxTime % 60 >= 10) {
          $("#chilling").html(
            Math.floor(relaxTime / 60) + ":" + relaxTime % 60
          );
        } else {
          $("#chilling").html(
            Math.floor(relaxTime / 60) + ":" + "0" + relaxTime % 60
          );
        }
      }
    }
  });

  $("#reset").click(function() {
    workTime = 25;
    relaxTime = 5;

    $("#working").html(workTime);
    $("#chilling").html(relaxTime);
  });

  $("#lessRelax").click(function() {
    relaxTime -= 1;
    $("#chilling").html(relaxTime);
  });
  $("#moreRelax").click(function() {
    relaxTime += 1;
    $("#chilling").html(relaxTime);
  });
  $("#lessWork").click(function() {
    workTime -= 1;
    $("#working").html(workTime);
  });
  $("#moreWork").click(function() {
    workTime += 1;
    $("#working").html(workTime);
  });
});