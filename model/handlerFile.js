var fs = require('fs');
var Users=require('../lib/user.js');
var moongoose=require('../lib/mongoose.js');


var newUsers = {};
var users = {};
var onlineUsers={};
var idCount=0;
//Класс содания объекта пользователя
function User(user) {
    return {
        name: user.name,
        password: user.password,
        id:getId(),
        link:"images/logo.jpg"
    }
}

//Проверка на наличие всех неоходимых полей Регестрация
function isValidUserRegistr(user) {
    return (!!user && isValidEmail(user.login) && !!user.name && !!user.password);
}
function isValidUserLogin(user) {
    return (!!user && !!user.login && !!user.password);
}
//Валидный-ли email вызывается в isValidUserRegistr и isValidUserLogin
function isValidEmail(email) {
    return (/\S+@\S+\.\S+/).test(email);
}
//Есть-ли совпадене с логином
function getUserIfExist(login) {
    return (users[login] || newUsers[login] || false);
}
//Восстановление пользователей из файла
function restoreUsers() {
    return new Promise(function (resolve, reject) {
        fs.readFile('store/storage.txt', {encoding: 'utf8'}, function (err, data) {
            if (err) reject(err);
            if (data.length > 0) {
                data = data.slice(0, data.length - 1) + '}';
                data = JSON.parse(data);
                resolve(data);
            }
        })
    })
}
function getId(){
    idCount+=1;
    return idCount;
}
//экспортируемый объект
var userStorage = {
    addNewUser: function (user) {
        if (isValidUserRegistr(user)) {
            if (!getUserIfExist(user.login)) {
                newUsers[user.login] = new User(user);
                if(!onlineUsers[newUsers[user.login].id]) {
                    onlineUsers[newUsers[user.login].id] = {
                        name: newUsers[user.login].name,
                        link: newUsers[user.login].link
                    }
                }
                return {
                    key:newUsers[user.login].id,
                    user:onlineUsers[newUsers[user.login].id]
                }
            }
            throw new ErrorHandler("User is already exist", 203);
        }
        throw new ErrorHandler("User entity is incorrect", 400);
    },
    login: function (user) {
        if (isValidUserLogin(user)) {
            var foundUser = getUserIfExist(user.login);
            if (foundUser) {
                if (foundUser.password == user.password){
                    if(!onlineUsers[foundUser.id]) {
                        onlineUsers[foundUser.id] = {
                            name: foundUser.name,
                            link: foundUser.link
                        }
                    }
                    return {
                        key:foundUser.id,
                        user:onlineUsers[foundUser.id]
                    }
                } else {
                    throw new ErrorHandler("Wrong data", 301);
                }
            } else {
                throw new ErrorHandler("User isn't already exist", 204);
            }
        }
        throw new ErrorHandler("User entity is incorrect", 400);
    },
    saveNewUsers: function () {
        if (!!Object.keys(newUsers).length) {

            var listNewUser = JSON.stringify(newUsers);
            listNewUser = listNewUser.slice(1, listNewUser.length - 1) + ',';
            fs.appendFileSync('store/storage.txt', listNewUser)
        }
    },
    deleteOnlineUser: function (name) {
        delete onlineUsers[name];
    },
    getOnlineUser:function(){
        return onlineUsers;
    }
};
function ErrorHandler(message, code) {
    this.value = code;
    this.message = (message );
}

ErrorHandler.prototype = Error.prototype;

restoreUsers().then(function (data) {
    users = data;
    idCount=users[Object.keys(data)[Object.keys(data).length-1]].id;
});


module.exports = userStorage;