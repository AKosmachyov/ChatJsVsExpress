var express = require('express');
var router = express.Router();
var urlencodedParser = require('body-parser').urlencoded({ extended: false });
var dataBase=require('../model/DB.js');

router.post('/onlineUsers',function(req,res){
    dataBase.getOnlineUser()
        .then(function (val) {
            res.send(JSON.stringify(val));
        })
});
router.post('/logout', urlencodedParser,function(req,res){
    // dataBase.deleteOnlineUser(req.body)
    //     .then(function () {
    //         res.send({message: "Successful"})
    //     }).catch(function (err) {
    //         res.status(400).send(err.message)
    // })
    //app.get('io').emit('deleteOnlineUser',req.body.id)
});
router.post('/connect', function (req, res) {

});

module.exports = router;