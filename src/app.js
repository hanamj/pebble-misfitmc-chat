var UI = require('ui');
var helper = require('helpers');

var chatCard = new UI.Card({
  title:'Chats',
  body: "Loading...",
  scrollable: true
});
chatCard.on('click', 'select', function() {
  helper.refreshChats(chatCard);
});

chatCard.show();
helper.refreshChats(chatCard);
