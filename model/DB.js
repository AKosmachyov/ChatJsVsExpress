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
    //return collection.findOne({email: email},{fields:{_id:1}});
    return collection.find({email: email}).limit(1).explain();
}

var userStorage = {
    addNewUser: function (user) {
        if (!isValidUserRegister(user))
            throw new Error("User entity is incorrect");
       return isExist(user.email)
            .then(function (err, val) {
                if (typeof val != "undefined") {
                    throw new Error("User is alredy");
                }
                var newUser = {
                    userName: user.name,
                    email: user.email,
                    password: user.password,
                    avatarLink: "images/logo.jpg"
                };
                return collection.insertOne(newUser)
            }).then(function (val) {
                return {
                    key: 5,
                    user: {
                        name: val.ops[0].userName
                    }
                }
            });
    },
    checkPassword: function (user) {

    },
    changePassword: function(user){

    }
};

module.exports = userStorage;
