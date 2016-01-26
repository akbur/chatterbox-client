var app = {
  server: 'https://api.parse.com/1/classes/chatterbox/',
  username: 'anonymous',
  rooms: {},
};

app.init = function() {
  //variables for data
  app.username = window.location.search.substr(10);

  //jquery dom elements
  app.$chat = $('#chats');
  app.$roomSelect = $('#roomSelect');


  //app.fetch();
};
 
app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent. Data: ', data);
    }, 
    error: function(data) {
      console.error('chatterbox: Failed to send message. Error: ', data);
    },
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server, 
    type: 'GET',
    //dataType: 'jsonp',
    contentType: 'application/json',
    success: function(data) {
      processRoomData(data);
      console.log(data);
    }, 
    error: function(data) {
      console.error('Failed to fetch: ', data);
    }
  });
};

app.processRoomData = function(data) {
  if (data) {
    _.each(data, function(item){
      var roomname = data.roomname;
      if (roomname && !app.rooms[roomname]) {
        app.addRoom(roomname);
        app.rooms[roomname] = true;
      }
    });
  }
};

app.clearMessages = function() {
  app.$chat.empty();
};

app.addMessage = function() {

};

app.addRoom = function(roomname) {
  var option = '<option value="' + roomname + '">' + roomname + '</option>';
  app.$roomSelect.append(option);
};

app.addFriend = function() {

};

app.handleSubmit = function() {

};

app.init();