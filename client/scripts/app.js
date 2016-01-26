var app = {
  server: 'https://api.parse.com/1/classes/chatterbox/',
  username: 'anonymous',
  rooms: {},
  friends: [],
};

app.init = function() {
  app.username = window.location.search.substr(10);

  app.fetch();
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
    contentType: 'application/json',
    success: function(data) {
      app.processRoomData(data);
      app.processMessageData(data);
    }, 
    error: function(data) {
      console.error('Failed to fetch: ', data);
    }
  });
};

app.processRoomData = function(data) {
  if (data) {
    _.each(data.results, function(message){
      var roomname = message.roomname;
      if (roomname && !app.rooms[roomname]) {
        app.addRoom(roomname);
        app.rooms[roomname] = true;
      }
    });
  }
};

app.processMessageData = function(data) {
  if (data) {
    _.each(data.results, function(message) {
      var text = message.text;
      var username = message.username;
      if (text && username) {
        app.addMessage(username, text);
      }
    });  
  }
}

app.clearMessages = function() {
  app.$chat.empty();
};

app.addMessage = function(username, text) {
  var message = '<div class="chat"><span class="username">';
  message += username + '</span><br>' + text + '</div>';
  $('#chats').append(message);
  //app.addUsernameHandler();
};

/* adding friends in progress
app.addUsernameHandler = function() {
  $('.username').on('click', app.addFriend($(this)));
}
*/

app.addRoom = function(roomname) {
  var option = '<option value="' + roomname + '">' + roomname + '</option>';
  $('#roomSelect').append(option);
};

/* adding friends in progress
app.addFriend = function(user) {
  console.log('adding friend');
  app.friends.push(user.val());
};
*/

app.handleSubmit = function() {

};

app.init();