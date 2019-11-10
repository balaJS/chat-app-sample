const pug = require('pug');
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const port = 8082;
const io_port = 8081;
const io = require('socket.io')(io_port);

app.set('view engine', 'pug');
app.use('', express.static('views'));
app.listen(port, () => console.log(`Server started at ${port}.`));

app.get('/', function(req, res) {
  res.render('chat', {
    title: 'Chat app',
  });
});

const users = {};

io.on('connection', function(socket) {
  socket.on('new-user', function(name) {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('chat-message', function(msg) {
  });

  socket.on('send-chat-message', function(msg) {
    socket.broadcast.emit('chat-message', {msg: msg, to_name: users[socket.id]});
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('user-disconnect', users[socket.id]);
    delete users[socket.id];
  });
});
