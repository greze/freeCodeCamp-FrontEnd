//make sure HTTPS everywhere is off
//make sure codepen is also not on https

$(document).ready(function() {
  var latitude;
  var longitude;
  var city;

  var api;
  var currentCondition;
  var iconCode;
  var iconUrl;

  var displayTemp;
  var celsius;
  var fahrenheit;
  var tempSwap = false;

  //get user's location by IP
  $.getJSON("http://ip-api.com/json", function(data2) {
    latitude = data2.lat;
    longitude = data2.lon;

    //weather api
    api =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=aca5c89ef841e64e65826994c2b4df68";

    $.getJSON(api, function(data) {
      currentCondition = data.weather[0].main;
      //().toFixed(#) = number of decimal places
      fahrenheit = (9 / 5 * (data.main.temp - 273) + 32).toFixed(1); // kelvin --> F
      celsius = (data.main.temp - 273).toFixed(1); // K --> C

      iconCode = data.weather[0].icon;
      iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      city = data.name;

      $("#city").html(city);

      $("#conditions").html(currentCondition);
      $("#icon").html("<img src='" + iconUrl + "'>");
      $("#displayTemp").html(celsius + " " + "&deg;" + " C"); //initially display celsius
      //click the temperature to change units
      $("#displayTemp").click(function() {
        if (tempSwap === false) {
          $("#displayTemp").html(fahrenheit + " " + "&deg;" + " F");
          tempSwap = true;
        } else {
          $("#displayTemp").html(celsius + " " + "&deg;" + " C");
          tempSwap = false;
        }
      }); //displayTemp

      //change background image based on weather conditions
      if (
        currentCondition == "Thunderstorm" ||
        currentCondition == "Drizzle" ||
        currentCondition == "Rain"
      ) {
        $("body").css(
          "background-image",
          'url("https://res.cloudinary.com/dqsbdwzek/image/upload/v1491957504/2017-04-11_23.12.44_bqqsu9.jpg")'
        );
      } else if (currentCondition == "Snow") {
        $("body").css(
          "background-image",
          'url("https://res.cloudinary.com/dqsbdwzek/image/upload/v1491667498/IMG_0940_wk5au4.jpg")'
        );
      } else if (currentCondition == "Clear") {
        $("body").css(
          "background-image",
          'url("https://res.cloudinary.com/dqsbdwzek/image/upload/v1491667144/IMG_2946_rk3rnj.jpg")'
        );
      } else if (currentCondition == "Clouds") {
        $("body").css(
          "background-image",
          'url("https://res.cloudinary.com/dqsbdwzek/image/upload/v1491667341/IMG_2624_qfuqsj.jpg")'
        );
      }
    }); // openweather getJSON
  }); // ip-api getJSON
}); //ready