const express = require('express');
const router = express.Router();
const dataBase=require('../model/DB.js');

router.post('/create', function (req, res) {
    dataBase.createRoom(req.cookies.token)
        .then(function (val) {
            res.send(val);
        }).catch(function (err) {
            res.status(400).send(err.message);
      })
});
router.post('/',function (req,res) {
    dataBase.getRooms(req.cookies.token)
        .then(function (val) {
            res.send(val);
        }).catch(function (err) {
            res.status(400).send(err.message)
        })
});
router.post('/disconnect',function(req,res){
    dataBase.disconnectFromRoom(req.cookies.token, req.body)
        .then(function () {
           res.send("Success")
        }).catch(function(err){
            res.status(400).send(err.message)
        });
});
router.post('/connect', function (req, res) {
    dataBase.connectToRoom(req.cookies.token, req.body)
        .then(function (val) {
            res.send(val);
        }).catch(function (err) {
        res.status(400).send(err.message)
    })
});

module.exports = router;