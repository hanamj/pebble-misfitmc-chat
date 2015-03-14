var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var fetching = false;

var detailCard = new UI.Card({
  title:'Chats',
  body: "Loading...",
  scrollable: true
});
detailCard.on('click', 'select', function() {
  if (!fetching) {
    setTimeout(function () {
      detailCard.title("Chats   **");
    }, 5);  
    setTimeout(function () {
      fetchChats(detailCard);
    }, 10);
  }
});

detailCard.show();

fetchChats(detailCard);

function fetchChats(card) {
  fetching = true;
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
        
        text = "-> " + name + ":\n" + msg + "\n" + text;
      }
      
      if (card.body() !== text) {
        card.body(text);
        Vibe.vibrate('short');
      }
      card.title("Chats");
      //Vibe.vibrate('short');
      fetching = false;
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
}

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
