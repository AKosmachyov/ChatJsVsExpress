var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var file=require(__dirname+'/model/handlerFile');



var oldUser={};

file.read().then(function (a) {
    oldUser=a;
});

var app = express();

app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/*app.use(bodyParser.json());*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
       res.sendFile(path.join(__dirname + '/views/index.html'));
   
});

app.post('/test',function(req,res){
    res.send(oldUser['name@email.com'].name);
});
app.post('/login',urlencodedParser,function(req,res){
    if(!!oldUser[req.body.login]){
        if(req.body.password==oldUser[req.body.login].password){
            res.send(oldUser[req.body.login].name);
        }else{
           res.status(302).send("ErrorIn");
        }
    }else{
        if(!!file.newUser[req.body.login]){
            if(req.body.password==file.newUser[req.body.login].password){
                res.send(file.newUser[req.body.login].name);
            }else{
                res.status(302).send("ErrorIn");
            }
        }else{
            res.status(203).send("ErrorEmail");
        }
    };    
});
app.post('/register',urlencodedParser,function(req,res){     
    if((!!oldUser[req.body.login])||(!!file.newUser[req.body.login])){
        res.status(302).send("ErorEmail");
    }else{
        file.newUser[req.body.login]={
            name:req.body.name,
            password:req.body.password
        };
        res.send(req.body.name);
    };    
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

