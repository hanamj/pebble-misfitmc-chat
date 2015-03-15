var UI = require('ui');
var chats = require('chats');
var players = require('players');

var mainMenu = new UI.Menu({
  sections: [{
    title: 'Misfit Minecraft',
    items: [{
      title: 'Online Players',
      subtitle: 'See who is online.',
      icon: 'images/pb_user.png'
    }, {
      title: 'Live Chat',
      subtitle: 'Refresh with Select',
      icon: 'images/pb_chat.png'
    }]
  }]
});

mainMenu.show();

mainMenu.on('select', function(e) {
  if (e.itemIndex === 0) {
    var playerCard = new UI.Card({
      title:'Players',
      body: "Loading...",
      scrollable: true,
      style: "small",
      icon: "images/pb_wait.png"
    });
    playerCard.on('click', 'select', function() {
      players.refreshPlayers(playerCard);
    });
    
    playerCard.show();
    players.refreshPlayers(playerCard);
  } else if (e.itemIndex === 1) {
    //Open Chats
    var chatCard = new UI.Card({
      title:'Chats',
      body: "Loading...",
      scrollable: true,
      style: "small",
      icon: "images/pb_wait.png"
    });
    chatCard.on('click', 'select', function() {
      chats.refreshChats(chatCard);
    });
    
    chatCard.show();
    chats.refreshChats(chatCard);
  }
});

