var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName:String,
    login: String,
    password:String,
    id: Number,
    link: String
});

module.exports=mongoose.model('Users', userSchema);