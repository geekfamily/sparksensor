/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var express = require('express');
var config = require('./config/environment');

// Setup server

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket = require('./services/socketsvc');

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
  socket.setSocket(io);
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = server;
