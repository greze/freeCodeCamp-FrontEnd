/* There seem to be issues with this freecodecamp challenge due to changes in the Twitch API. Because I am not a Twitch user, I would rather not go through the process of getting a client ID to properly call the API. The limitations of FCC pass-through are what I have worked with, and thus I'm leaving this project fairly ugly and not incredibly useful, at least for the time being.*/
$(document).ready(function() {
  var channel = ["freecodecamp", "ESL_SC2", "noobs2ninjas"];
  //var chanLink = [];
  var api;
  for (var i = 0; i < channel.length; i++) {
    api =
      "https://wind-bow.gomix.me/twitch-api/streams/" +
      channel[i] +
      "?callback=?";
    /*chanLink[i] = "https://twitch.tv/" + channel[i];
    $("#chanLink").append("<li><a href=" + chanLink[i] + " target='_blank'>" + channel[i] + "</a> is: </li>");*/
    $.getJSON(api, function(data) {
      if (data.stream === null) {
        $("#status").prepend("<li>offline.</li>");
      } else {
        $("#status").prepend("<li>streaming " + data.stream.game + ".</li>");
      }
    }); //getJSON
  }
}); // ready

/* pre-mod
$(document).ready(function(){
  var streamers = [
    "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
  ];
  for (var i = 0; i < streamers.length; i++) {
    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + streamers[i] + '?callback=?', function(data) {
      if (data.stream === null) {
      $("#streamers").html("<li><a href=" + data._links.channel + " target='blank'>" + data._links.channel + "</a> Offline</li>")
      } else {
        $("#streamers").append("<li><a href=" + data._links.channel + " target='blank'> Channel: " + data._links.channel + "</a>" +"<a href=" + data._links.self + "target='blank'> Game: " + data.stream.game + "</a></li>")
      }
      console.log(data);
    });
  } // for
}); // ready
*/