const DBconfig = require('./DBconfig.js');

const Room = function (userId) {
    let counterId = DBconfig.getRoomId();
    return {
        id: counterId,
        title: `room-${counterId}`,
        adminId: userId,
        onlineUsers: [],
        imgLink: 'images/logo.jpg'
    }
};

module.exports = Room;