const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
const url = 'mongodb://localhost:27017/Chat';
const User = require('./User.js');
const Room = require('./Room.js');
const Message = require('./Message.js');
var collectUsers, collectRooms, collectMessages;

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to DB");
    collectUsers = db.collection('Users');
    collectRooms = db.collection('Rooms');
    collectMessages = db.collection('Messages');
});

function isValidUserRegister(user) {
    return (!!user && isValidEmail(user.email) && !!user.userName && !!user.password);
}
function isValidUserLogin(user){
    return (!!user && isValidEmail(user.email) && !!user.password)
}
function isValidEmail(email) {
    return (/\S+@\S+\.\S+/).test(email);
}

const Storage = {
    singUp: function (user) {
        if (!isValidUserRegister(user))
            return Promise.reject(new Error("User entity is incorrect"));
        user.email = user.email.toLowerCase();
        return collectUsers.find({email: user.email}).count()
            .then(function (count) {
                if (count || 0 > 0) {
                    throw new Error("This email is already registered");
                }
                return collectUsers.insertOne(new User(user))
                    .then(function(val){
                        return {
                            user: {
                                avatarLink: val.ops[0].avatarLink,
                                id: val.ops[0].id
                            },
                            token: val.ops[0].token,
                        }
                    });
            });
    },
    logIn: function (user) {
        if(!isValidUserLogin(user))
            return Promise.reject(new Error("User entity is incorrect"));
        user.email = user.email.toLowerCase();
        return collectUsers.find(user).next()
            .then(function (val) {
                if (val === null)
                    throw new Error("Email or password is incorrect");
                return collectUsers.findOneAndUpdate(user, {$set: {isOnline: true}});
            }).then(function (val) {
                if(val.lastErrorObject.n != 1)
                    return Promise.reject(new Error("Error logOut"));
                return {
                    user: {
                        id: val.value.id,
                        userName: val.value.userName,
                        avatarLink: val.value.avatarLink
                    },
                    token: val.value.token
                }
            })
    },
    userLogOut: function (token) {
        if(!(!!token)){
            return Promise.reject(new Error("User entity is incorrect"));
        }
        return collectUsers.findOneAndUpdate({token: token}, {$set: {isOnline: false}})
            .then(function (val) {
                if(val.lastErrorObject.n != 1)
                    return Promise.reject(new Error("Error logOut"));
                return;
            })
    },
    createRoom: function (token) {
        if(!token){
            return Promise.reject(new Error("User entity is incorrect"));
        }
        var room = 5 ;
        return collectUsers.find({token: token}).next()
            .then(function (val ) {
                if (val === null)
                    throw new Error("You aren't authorize");
                return val.id;
            }).then(function (id) {
                return collectRooms.insertOne(new Room(id));
            }).then(function (val) {
                room = val.ops[0];
                return collectUsers.findOneAndUpdate({token: token}, {$push: {ownRooms: val.ops[0].id}})
            }).then(function (val) {
                if(val.ok != 1)
                    return Promise.reject(new Error("Error adding room"));
                return room;
            })
    },
    // userId, roomId
    connectToRoom: function (objId) {
        if(!(!!objId && !!objId.userId && !!objId.roomId))
            return Promise.reject(new Error("User entity is incorrect"));
        return collectRooms.findOneAndUpdate({id: objId.roomId}, {$push: {}})
    },
    changePassword: function(user) {
        if (!(!!user && !!user.userName && !!user.password && !!user.newPassword))
            return Promise.reject(new Error("User entity is incorrect"));
        return collectUsers.findOneAndUpdate({userName: user.userName, password: user.password}, {$set: {password: user.newPassword}})
            .then(function(val){
                if(val.lastErrorObject.n != 1)
                    return Promise.reject(new Error("User password is incorrect"));
                return;
        });
    },
    getOnlineUser: function () {
        return collectRooms.find({}, {_id: 0}).toArray();
    }
};

module.exports = Storage;