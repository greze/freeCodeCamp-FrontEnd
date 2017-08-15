$(document).ready(function(){
  $("#search").click(function(){
    var searchTerm = $("#searchTerm").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?"
    //callback let's us search from outside wikipedia
    $.ajax({
      type:"GET",
      url:url,
      async:false,
      dataType:"json",
      success:function(data){
        //data[1][0] is the heading, [2][0] is description, [3][0] is a link
        //wipe before each search
        $("#output").html('');
        for (var i = 0; i < data[1].length; i++){
          $("#output").append("<li class='box'><a href= " + data[3][i] + " target='blank'>" + data[1][i] + "</a><p>" +  data[2][i] + "</p></li>");
        }
      }, //success
      error:function(errorMessage){
        alert("Error");
      } //error
      
    }); //ajax
  }); //search
  
}); //ready