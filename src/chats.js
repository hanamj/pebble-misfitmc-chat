var ajax = require('ajax');
var Vibe = require('ui/vibe');

var exports;
exports.refreshChats = refreshChats;

var fetchingChats = false;

function removeFormatting(str) {
  var i = str.indexOf("§");
  while (i != -1) {
    str = str.substring(0, i) + str.substring(i+2);
    i = str.indexOf("§");
  }
  
  while ((str.indexOf("[") != -1) && (str.indexOf("]") != -1)) {
    str = str.substring(0, str.indexOf("[")) + str.substring(str.indexOf("]")+2);
  }
  
  return str;
}

function refreshChats(card) {
  if (fetchingChats) return;
  fetchingChats = true;
  setTimeout(function () {
    //card.title("Chats   **");
    card.icon("images/pb_wait.png");
  }, 1);
  setTimeout(function () {
    fetchChats(function (text) {
      //card.title("Chats");
      card.icon("images/pb_chat.png");
      fetchingChats = false;
      
      if (card.body() !== text) {
        card.body(text);
        Vibe.vibrate('short');
      }
    });
  }, 50);
}

function fetchChats(cb) {
  ajax(
    {
      url:'https://misfitmc-players.firebaseio.com/newchat.json?orderBy=%22$priority%22&limitToLast=10',
      type:'json'
    },
    function(d) {
      var text = "";
      var name = "";
      var msg = "";
      for(var index in d) {
        name = removeFormatting("" + d[index].dname);
        if (name.length >= 15) name = name.substring(0, 5) + "..";
        
        msg = d[index].chat;
        msg = removeFormatting(msg);
        
        if (d[index].type === "chat") {
          text = "-- " + name + ":\n" + msg + "\n" + text;
        } else if (d[index].type === "join") {
          text = "> " + name + " joined.\n" + text;
        } else if (d[index].type === "quit") {
          text = "< " + name + " quit.\n" + text;
        } else {
          text = "* " + msg + "\n" + text;
        }
      }
      
      cb(text);
    },
    function(error, status) {
      cb("Error: " + status);
      console.log('Download failed: ' + error);
    }
  );
}