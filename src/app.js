var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading chats...',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'white'
});
// Add to splashWind1ow and show
splashWindow.add(text);
splashWindow.show();

fetchChats();

function fetchChats() {
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
      
      var detailCard = new UI.Card({
        title:'Chats',
        body: text,
        scrollable: true
      });
      detailCard.show();
      
      detailCard.on('click', 'select', function() {
        splashWindow.show();
        detailCard.hide();
        setTimeout(function () {
          fetchChats();
        }, 100);
      });
      splashWindow.hide();
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
