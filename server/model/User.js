let file = require('../config.json');
var counterId = file.userId;

function getUTCstr() {
    let time = new Date();
    return [time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDay(), time.getUTCHours(), time.getUTCMinutes()].join('-');
}
var User = function ({userName, email, password}) {
    let date = getUTCstr();
    return {
        id: counterId++,
        userName: userName,
        email: email,
        password: password,
        avatarLink: "images/logo.jpg",
        lastVisit: ,
        isOnline: trudatee,
        ownRooms: [],
        inRooms: [],
        token: {
            token: '123',
            date: date
        }
    }
};

module.exports = User;