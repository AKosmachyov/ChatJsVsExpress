let file = require('../config.json');
var counterId = file.roomId;

const Room = function (userId) {
    return {
        id: counterId++,
        title: `room-${counterId}`,
        adminId: userId,
        onlineUsers: [],
        imgLink: 'images/logo.jpg'
    }
};

module.exports = Room;