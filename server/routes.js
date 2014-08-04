/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var services = require('./api/sparkcore/spark');

module.exports = function(app) {

  // Insert routes below

  //services
  app.get('/api/sparkcore/devices', services.spark.devices);
  app.get('/api/sparkcore/function', services.spark.callFunction);
  app.post('/api/sparkcore/function', services.spark.runFunction);
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
