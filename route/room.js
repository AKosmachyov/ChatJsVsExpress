var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.post('/onlineUsers',function(req,res){
    //res.send(file.getOnlineUser());
});
router.post('/logout',function(req,res){
    file.deleteOnlineUser(req.body.id);
    app.get('io').emit('deleteOnlineUser',req.body.id)
    res.send('ok');
});

module.exports = router;