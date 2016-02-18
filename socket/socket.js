module.exports = function(server) {
    var io = require('socket.io')(server);



    io.on('connection', function (socket) {
        socket.on('chat message', function (message) {
            socket.broadcast.emit('chat message', message);
        });
        socket.on('deleteMessage',function(messageObj){
            socket.broadcast.emit('deleteMessage',messageObj);
        })
    });

};