var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var file=require(__dirname+'/model/handlerFile');
var multer  = require('multer');
var profile = require('./route/profile.js');
var room = require('./route/room.js');

var app = express();

app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use('/profile', profile);
app.use('/room', room);

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

