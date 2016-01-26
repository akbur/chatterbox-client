var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  username: 'anonymous',
};

app.init = function() {

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

};

app.clearMessages = function() {

};

app.addMessage = function() {

};

app.addRoom = function() {

};

app.addFriend = function() {

};

app.handleSubmit = function() {

};