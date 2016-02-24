var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var file=require(__dirname+'/model/handlerFile');

var app = express();

app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/*app.use(bodyParser.json());*/
app.use(cookieParser());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.post('/login',urlencodedParser,function(req,res){
    try {
        var name=file.login(req.body);
        res.send(name);
        app.get('io').emit('sendOnlineUser',name.name);//return name User who add in chat for other user
    }catch (err){
        switch (err.value){
            case 204: res.status(204).send(); break;
            case 301: res.status(301).send(); break;
            case 400: res.status(400).send(); break;
            default: res.status(500).send('UnExpected Error'); break;
        }
    }
});
app.post('/register',urlencodedParser,function(req,res){
    try {
        res.send(file.addNewUser(req.body));
        app.get('io').emit('sendOnlineUser',req.body.name);
    }catch (err){
        switch (err.value) {
            case 203:res.status(203).send();break;
            case 400:res.status(400).send();break;
            default: res.status(500).send('UnExpected Error'); break;
        }
    }

});
app.post('/logout',urlencodedParser,function(req,res){
    file.deleteOnlineUser(req.body.name);
    res.send('ok');
    app.get('io').emit('deleteOnlineUser',req.body.name)
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

