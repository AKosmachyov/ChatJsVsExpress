const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

const url = 'mongodb://localhost:27017/Chat';
var collection;
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected")
    collection = db.collection('Users');
});
const UserEntity = function ({userName, email, password}) {
    return{
        userName: userName,
        email: email,
        password: password,
        avatarLink: "images/logo.jpg"
    }
};

function isValidUserRegister(user) {
    return (!!user && isValidEmail(user.email) && !!user.userName && !!user.password);
}
function isValidUserLogin(user){
    return (!!user && isValidEmail(user.email) && !!user.password)
}
function isValidEmail(email) {
    return (/\S+@\S+\.\S+/).test(email);
}

var userStorage = {
    addNewUser: function (user) {
        if (!isValidUserRegister(user))
            return Promise.reject("User entity is incorrect");
        return collection.find({$or:[{userName: user.userName}, {email: user.email}]}).count()
            .then(function (count) {
                if (count > 0) {
                    throw new Error("This email is already registered");
                }
                return collection.insertOne(new UserEntity(user))
            });
    },
    login: function (user) {
        if(!isValidUserLogin(user))
            return Promise.reject("User entity is incorrect");
        return collection.find(user).next()
            .then(function (val) {
                if(val === null)
                    throw new Error("Email or password is incorrect");
                return {
                    userName: val.userName,
                    avatarLink: val.avatarLink
                }
            })
    },
    changePassword: function(user){

    }
};

module.exports = userStorage;
