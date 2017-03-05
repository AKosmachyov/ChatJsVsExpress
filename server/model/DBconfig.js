const fs = require('fs');
let file = require('../DBconfig.json');

let userId = file.userId || 1;
let roomId = file.roomId || 1;

const DBCconfig = {
    getUserId: function () {
        return userId++;
    },
    getRoomId: function () {
        return roomId++;
    },
    saveConfig: function (func) {
        return new Promise((resolve, reject) => {
            let obj = JSON.stringify({
                userId: userId,
                roomId: roomId
            });
            fs.writeFile(__dirname + '/../DBconfig.json', obj, (err) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }
};

module.exports = DBCconfig;