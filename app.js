var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var file=require(__dirname+'/model/handlerFile');
var onlineUsers=[];

var app = express();

app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/*app.use(bodyParser.json());*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/login',urlencodedParser,function(req,res){
    try {
        res.send(file.login(req.body));
    }catch (err){
       if(err.value==204)
           res.status(204).send();
       if(err.value==301)
           res.status(301).send();
       if(err.value==400)
           res.status(400).send();
    }
});
app.post('/register',urlencodedParser,function(req,res){
    try {
        res.send(file.addNewUser(req.body));
    }catch (err){
        if(err.value==203)
            res.status(203).send();
        if(err.value==400)
            res.status(400).send();
    }
});
app.post('/logout',urlencodedParser,function(req,res){
    file.deleteOnlineUser(req.body.name);
    res.send('ok');
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

