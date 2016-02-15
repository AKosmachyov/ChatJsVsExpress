var fs = require('fs');


var file = {
    add: function (a) {
        console.log(file.newUser);
        a=JSON.stringify(a);
        a=a.slice(1, a.length-1)+',';
        fs.appendFileSync('store/storage.txt', a)
    },
    read: function () {
        return new Promise(function (resolve,reject) {
            fs.readFile('store/storage.txt', {encoding: 'utf8'}, function (err, data) {
                if (err) reject(err);
                if (data.length > 0) {
                    data=data.slice(0,data.length-1)+'}';
                    data=JSON.parse(data);
                    resolve(data);
                }
            })
        })
    },
    newUser:{},
    saveNewUser: function () {
        if (file.newUser.length > 0){
            file.add(file.newUser);
        };
    }
};

module.exports = file;