var express = require('express');
var router = express.Router();
var dataBase=require('../model/DB.js');

router.post('/login', function(req,res){
    dataBase.login(req.body)
        .then(function (val) {
            res.send(val);
        }).catch(function (err) {
        res.status(400).send(err.message)
    });
        //app.get('io').emit('sendOnlineUser',temp);//return name User who add in chat for other user
});
router.post('/register', function(req,res){
    dataBase.addNewUser(req.body).then(function (temp) {
        res.send({avatarLink:'/images/logo.jpg'});
        //app.get('io').emit('sendOnlineUser',temp)
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
router.post('/changePassword', function(req,res) {
    dataBase.changePassword(req.body)
        .then(function (val) {
            res.send('Successful');
        }).catch(function (err) {
        res.status(400).send(err.message);
    })
});

module.exports = router;