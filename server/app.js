/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var socket  = require('./services/socket.js')(io);

require('./config/express')(app);
require('./routes')(app);

var contextPath = "";

// Socket.io Communication
//socket.emit(io);

//io.sockets.on('connection', socket);
//io.sockets.on('connection', function(socket){
//
//  socket.on('send:ledevent', function (data) {
//    if (data.led=="on"){
//      socket.emit('send:ledon', { data: data });
//    } else {
//      socket.emit('send:ledoff', { data: data });
//    }
//  });
//
//});


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;