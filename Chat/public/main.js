$(function () {

    //socket iniciado
    var socket = io.connect();

    //variables
    var message = $('#chat-message');
    var chat = $('#chat');
    message.focus();

    $('#message-box').submit(function (e) {
        e.preventDefault();
        socket.emit('client-message', message.val());
        message.val('');
    });

    socket.on('server-message', function(data) {
        chat.append(data + '<br/>');
    })

    socket.on('load old msgs', msgs => {
        for(let i = msgs.length -1; i >=0 ; i--) {
          displayMsg(msgs[i]);
        }
      });

    function displayMsg(data) {
        chat.append(`<p class="msg">${data.msg}</p>`);
    }
  
});