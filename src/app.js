var UI = require('ui');
var chats = require('chats');

var mainMenu = new UI.Menu({
  sections: [{
    title: 'Misfit Minecraft',
    items: [{
      title: 'Online Players',
      subtitle: 'See who is online.',
      icon: 'images/pb_mc_creep.png'
    }, {
      title: 'Live Chat',
      subtitle: 'Refresh with Select',
      icon: 'images/pb_mc_creep.png'
    }]
  }]
});

mainMenu.show();

mainMenu.on('select', function(e) {
  if (e.itemIndex === 0) {
    //Open Players
  } else if (e.itemIndex === 1) {
    //Open Chats
    var chatCard = new UI.Card({
      title:'Chats',
      body: "Loading...",
      scrollable: true,
      style: "small"
    });
    chatCard.on('click', 'select', function() {
      chats.refreshChats(chatCard);
    });
    
    chatCard.show();
    chats.refreshChats(chatCard);
  }
});

