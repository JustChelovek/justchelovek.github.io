jQuery("#credits").on("click", function() {
    var message = "Game created by Aleksey!";
    jQuery('#credits').empty();
    jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});


jQuery ("#scrBtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
      "<li>" + "Me - 1000" + "</li>" +
      "<li>" + "Also me -100" + "</li>" +
      "<li>" + "Me again - 10" + "</li>" +
    "</ul>");
  });


jQuery("#crdBtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
     "<li>" + "Aleksey Pankin, The Greatest person of the whole site..." + "</li>" +
    "</ul>"
  );
});


jQuery("#hlpBtn").on("click", function(){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
     "<li>" + "Press SPACEBAR to Jump" + "</li>" +
     "<li>" + "Try to score as much as possible" + "</li>"+
     "<li>" + "There're some secrets in the game, find em!" + "</li>" +
    "</ul>"
  );
});
var Best = 0;
function registerScore (score){
  if (score>Best) {
   Best=score;
   jQuery('#uno').empty();
   var playerName = prompt("What's your name?");
   var scoreEntry = "<li>" + playerName + " - " + score.toString() + "</li>";
   jQuery('#uno').append(scoreEntry);}
  else if (true) {
  alert('Try harder!');
  }
}
