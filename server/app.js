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

// Start server
server.listen(config.port, config.ip, function () {
  socket.setSocket(io);
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = server;
