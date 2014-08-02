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
//var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

var contextPath = "";

//var router = express.Router();
//
//app.use(contextPath, router);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


// Expose app
exports = module.exports = app;