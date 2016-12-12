var express = require('express');
var router = express.Router();
var dataBase=require('../model/DB.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/login',urlencodedParser,function(req,res){
    dataBase.login(req.body)
        .then(function (val) {
            res.send(val);
        }).catch(function (err) {
        res.status(400).send(err.message)
    });
        //app.get('io').emit('sendOnlineUser',temp);//return name User who add in chat for other user
});
router.post('/register',urlencodedParser,function(req,res){
    dataBase.addNewUser(req.body).then(function (temp) {
        res.send("Successful");
        //app.get('io').emit('sendOnlineUser',temp)
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
router.post('/changePassword',urlencodedParser,function(req,res) {
    dataBase.changePassword(req.body)
        .then(function (val) {
            res.send('Successful');
        }).catch(function (err) {
        res.status(400).send(err.message);
    })
});

module.exports = router;