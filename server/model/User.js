const DBconfig = require('./DBconfig.js');
const crypto = require('crypto');

function getNewToken(str) {
    let hash = crypto.createHash('sha256');
    hash.update(str + new Date());
    return hash.digest('hex');
}
function getUTCstr() {
    let time = new Date();
    return [time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes()].join('-');
}
const User = function ({userName, email, password}) {
    let date = getUTCstr();
    return {
        id: DBconfig.getUserId(),
        userName: userName,
        email: email,
        password: password,
        avatarLink: "images/logo.jpg",
        lastVisit: date,
        isOnline: true,
        ownRooms: [],
        inRooms: [],
        token: getNewToken(`{userName}{counterId}`)
    }
};

module.exports = User;