const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

const url = 'mongodb://localhost:27017/Chat';
var collUsers, collOnline;
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected");
    collUsers = db.collection('Users');
    collOnline = db.collection('Online');
});

const UserEntity = function ({userName, email, password}) {
    return{
        userName: userName,
        email: email,
        password: password,
        avatarLink: "images/logo.jpg"
    }
};
const UserOnlineEntity = function ({userName, avatarLink}) {
    return{
        userName:userName,
        avatarLink:avatarLink
    }
}

function addUserForOnline(user) {
    return collOnline.insertOne(user);
}
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
            return Promise.reject(new Error("User entity is incorrect"));
        return collUsers.find({$or:[{userName: user.userName}, {email: user.email}]}).count()
            .then(function (count) {
                if (count > 0) {
                    throw new Error("This email is already registered");
                }
                return collUsers.insertOne(new UserEntity(user))
                    .then(function(val){
                        return addUserForOnline(new UserOnlineEntity(val.ops[0]));
                    });
            });
    },
    login: function (user) {
        if(!isValidUserLogin(user))
            return Promise.reject(new Error("User entity is incorrect"));
        return collUsers.find(user).next()
            .then(function (val) {
                if (val === null)
                    throw new Error("Email or password is incorrect");
                return addUserForOnline(new UserOnlineEntity(val));
            }).then(function (val) {
                return {
                    userName: val.ops[0].userName,
                    avatarLink: val.ops[0].avatarLink
                }
            })
    },
    changePassword: function(user) {
        if (!(!!user && !!user.userName && !!user.password && !!user.newPassword))
            return Promise.reject(new Error("User entity is incorrect"));
        return collUsers.findOneAndUpdate({userName: user.userName, password: user.password}, {$set: {password: user.newPassword}})
            .then(function(val){
                if(val.lastErrorObject.n != 1)
                    return Promise.reject(new Error("User password is incorrect"));
                return;
        });
    },
    getOnlineUser: function () {
        return collOnline.find({},{_id: 0}).toArray();
    },
    deleteOnlineUser: function (user) {
        if (!(!!user && !!user.userName))
            return Promise.reject(new Error("User entity is incorrect"));
        return collOnline.findOneAndDelete({userName: user.userName})
            .then(function (val) {
                if(val.lastErrorObject.n != 1)
                    return Promise.reject(new Error("User isn't online"));
                return;
            })
    }
};

module.exports = userStorage;