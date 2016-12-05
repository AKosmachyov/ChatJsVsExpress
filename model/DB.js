/**
 * Created by Alexander on 09.03.2016.
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/Chat';
var collection;
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected")
    collection = db.collection('Users');
});

function isValidUserRegister(user) {
    return (!!user && isValidEmail(user.email) && !!user.name && !!user.password);
}
function isValidEmail(email) {
    return (/\S+@\S+\.\S+/).test(email);
}
function isExist(email) {
    return collection.findOne({email: email});
}

var userStorage = {
    addNewUser: function (user) {
        if (!isValidUserRegister(user))
            throw new Error("User entity is incorrect");
        isExist(user.email)
            .then(function (err, val) {
                if (val != "undefined") {
                    throw new Error("User is alredy");
                }
                var newUser = {
                    userName: user.name,
                    email: user.email,
                    password: user.password,
                    avatarLink: "images/logo.jpg"
                };
                return collection.insertOne(newUser)
            }).then(function () {
                return {
                    key: 5,
                    user: {
                        name: newUser.name
                    }
                }
            });
    }
};

module.exports = userStorage;
