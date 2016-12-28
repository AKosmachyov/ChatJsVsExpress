#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('ExpressChatJs:server');
var http = require('http');
const dataBase = require('../model/DB.js')

var sockets = [];

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort('8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
var io = require('../socket/socket')(server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/*
  server close
*/

process.on('SIGINT', function() {
  console.log('key determinate detected');
  dataBase.dropOnlineUsers()
      .then(function () {
            sockets.forEach(function (socet) {
              socet.destroy();
            });

            server.close(function () {
              console.log('Stop server event');
              process.exit(0);
            });
      }, function (err) {
          if(err.message == 'ns not found')
            server.close(function () {
              console.log('Stop server event');
              process.exit(0);
            });
      })
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
server.on('connection',function(socket){
  sockets.push(socket);
});
app.set('io',io);