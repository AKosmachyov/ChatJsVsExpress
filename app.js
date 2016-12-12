var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var file=require(__dirname+'/model/handlerFile');
var multer  = require('multer');
var dataBase=require(__dirname+'/model/DB.js');


var app = express();

app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(cookieParser());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.post('/onlineUsers',function(req,res){
    res.send(file.getOnlineUser());
});
app.post('/login',urlencodedParser,function(req,res){
    try {
        dataBase.login(req.body)
            .then(function (val) {
                res.send(val);
            }).catch(function (err) {
            res.status(400).send(err.message)
        });
        //app.get('io').emit('sendOnlineUser',temp);//return name User who add in chat for other user
    }catch (err){
    }
});
app.post('/register',urlencodedParser,function(req,res){
    dataBase.addNewUser(req.body).then(function (temp) {
        res.send("Successful");
        //app.get('io').emit('sendOnlineUser',temp)
    }).catch(function (err) {
        res.status(400).send(err.message);        
    });
});
app.post('/logout',urlencodedParser,function(req,res){
    file.deleteOnlineUser(req.body.id);
    app.get('io').emit('deleteOnlineUser',req.body.id)
    res.send('ok');
});
app.post('/changePassword',urlencodedParser,function(req,res) {
    dataBase.changePassword(req.body)
        .then(function (val) {
            res.send('Successful');
        }).catch(function (err) {
            res.status(400).send(err.message);
    })
});

var storage =  multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now()+ '-' + file.originalname);
    }
});

var upload = multer({ storage : storage}).single('recfile');

app.post('/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

