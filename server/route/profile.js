const express = require('express');
const router = express.Router();
const dataBase=require('../model/DB.js');

router.post('/login', function(req,res){
    dataBase.logIn(req.body).then(function (val) {
        res.cookie('token', val.token, { maxAge: 432000000, httpOnly: true });
        res.send(val.user);
    }).catch(function (err) {
        res.status(400).send(err.message)
    });
});
router.post('/register', function(req,res){
    dataBase.singUp(req.body).then(function (obj) {
        res.cookie('token', obj.token, { maxAge: 432000000, httpOnly: true });
        res.send(obj.user);
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
router.post('/logout', function(req,res){
    dataBase.userLogOut(req.cookies.token).then(function () {
        res.send("Success");
    }).catch(function (err) {
        res.status(400).send(err.message);
    });
});
router.post('/changePassword', function(req,res) {
    // dataBase.changePassword(req.body)
    //     .then(function (val) {
    //         res.send('Successful');
    //     }).catch(function (err) {
    //     res.status(400).send(err.message);
   // })
    res.status(400).send('Not ready');
});

module.exports = router;