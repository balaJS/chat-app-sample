const socket = io('http://127.0.0.1:8081');

const $form = $('form');
const $msgbox = $('#msg-input', $form);
const $msglist = $('#messages');
var name = localStorage.getItem('name') || '';

if (!name) {
  name = prompt('What is your name?');
  localStorage.setItem('name', name);
  append_msg('Great, you joined.');
}
socket.emit('new-user', `${name}`);

$form.submit(function(e) {
  e.preventDefault();
  let msg = $msgbox.val();
  socket.emit('send-chat-message', msg);

  append_msg(`You: ${msg}`, 'current_user');
  $msgbox.val('');
});

function append_msg(msg, type = 'normal') {
  $msglist.append(`<li class=${type}>${msg}</li>`);
}

socket.on('user-connected', function(name) {
  append_msg(`${name} connected.`);
});

socket.on('user-disconnect', function(name) {
  append_msg(`${name} disconnected.`);
});

socket.on('chat-message', function(data) {
  append_msg(`${data.to_name}: ${data.msg}`, 'other_user');
});
