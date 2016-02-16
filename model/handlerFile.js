var fs = require('fs');

var newUsers = {};
var users = {};

//Класс содания объекта пользователя
function User(user) {
    return {
        name: user.name,
        password: user.password
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
function isUserExist(login) {
    return (!!users[login]||!!newUsers[login]);
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
//экспортируемый объект
var userStorage = {
    addNewUser: function (user) {
        if (isValidUserRegistr(user)) {
            if (!isUserExist(user.login)) {
                newUsers[user.login] = new User(user);
                return user.name;
            }
            throw new ErrorHandler("User is already exist",203);
        }
        throw new ErrorHandler("User entity is incorrect",400);
    },
    login: function (user) {
        if (isValidUserLogin(user)) {
            if(isUserExist(user.login)){
                if(user.password===users[user.login].password){
                    return users[user.login].name;
                }else{
                    if(user.password===newUsers[user.login].password) {
                        return newUsers[user.login].name;
                    }else{
                        throw new ErrorHandler("Wrong data",301)
                    }
                }
            }else{
                throw new ErrorHandler("User isn't already exist",204);
            }
        }
        throw new ErrorHandler("User entity is incorrect",400);
    },
    saveNewUsers: function () {
        if (!!Object.keys(newUsers).length) {

            var listNewUser = JSON.stringify(newUsers);
            listNewUser = listNewUser.slice(1, listNewUser.length - 1) + ',';
            fs.appendFileSync('store/storage.txt', listNewUser)
        }
    }
};
function ErrorHandler(message,code) {
    this.value = code;
    this.message = (message );
}
ErrorHandler.prototype = Error.prototype;

restoreUsers().then(function (data) {
    users=data;
});

module.exports = userStorage;