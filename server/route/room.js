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
router.post('/onlineUsers',function(req,res){
    // dataBase.getOnlineUser()
    //     .then(function (val) {
    //         res.send(JSON.stringify(val));
    //     })
    res.status(400).send('Not ready')
});
router.post('/logout',function(req,res){
    // dataBase.deleteOnlineUser(req.body)
    //     .then(function () {
    //         res.send({message: "Successful"})
    //     }).catch(function (err) {
    //         res.status(400).send(err.message)
    // })
    //app.get('io').emit('deleteOnlineUser',req.body.id)
    res.status(400).send('Not ready')
});
router.post('/connect', function (req, res) {
    res.status(400).send('Not ready')
});

module.exports = router;