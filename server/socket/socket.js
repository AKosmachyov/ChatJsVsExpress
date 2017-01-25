module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('sendNewMessage', function (message) {
            socket.broadcast.emit('newMessage', message);
        });
        socket.on('deleteMessage',function(messageObj){
            socket.broadcast.emit('deleteMessage',messageObj);
        });
    });
    return io;
};