var ajax = require('ajax');

var exports;
exports.refreshPlayers = refreshPlayers;

var fetchingPlayers = false;

function refreshPlayers(card) {
  if (fetchingPlayers) return;
  fetchingPlayers = true;
  setTimeout(function () {
    card.icon("images/pb_wait.png");
  }, 1);
  setTimeout(function () {
    getPlayers(function (text) {
      card.icon("images/pb_user.png");
      fetchingPlayers = false;
      
      if (card.body() !== text) {
        card.body(text);
      }
    });
  }, 50);
}

function getPlayers(cb) {
  ajax(
    {
      url:'https://misfitmc-players.firebaseio.com/players.json',
      type:'json'
    },
    function(d) {
      var text = "";
      for(var index in d) {
        text += d[index].displayName + "\n";
      }
      
      cb(text);
    },
    function(error, status) {
      cb("Error: " + status);
      console.log('Download failed: ' + error);
    }
  );
}