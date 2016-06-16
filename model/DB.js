/**
 * Created by Alexander on 09.03.2016.
 */

var mongoose = require('mongoose');

var Users=mongoose.model('Users', userSchema);

var userSchema = new mongoose.Schema({
    userName:String,
    email: String,
    password:String,
    avatarLink: String
});

function isValidUserRegister(user) {
    return (!!user && isValidEmail(user.email) && !!user.name && !!user.password);
}
function isValidEmail(email) {
    return (/\S+@\S+\.\S+/).test(email);
}
function isExist(email) {
    return Users.count({ 'email': email }, function(err, c) {
        return c;
    });
}
var userStorage = {
    addNewUser: function (user){
        if (!isValidUserRegister(user))
            throw new Error("User entity is incorrect");
        if (isExist(user.email) !=0)
            throw new Error("User is already exist");
        var newUser = new Users({
            userName: user.name,
            email: user.email,
            password: user.password,
            avatarLink: "images/logo.jpg"
        });
        newUser.save(function (err) {
            if (err)
               throw Error('DB error: user can not be saved');
            });
        return {
            key: 5,
            user: {
                name:newUser.name,
            }
        };
    },
};

module.exports = userStorage;
