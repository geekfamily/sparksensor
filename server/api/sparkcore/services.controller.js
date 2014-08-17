'use strict';

var request = require('request'),
  _ = require('lodash'),
  q = require('q'),
  extend = require('extend'),
  conf = require('../../config/serverconfig');

exports.getDevices = function (options, done) {
  return makeRequest(_.merge({}, options, {path: '/devices?access_token='+conf.get('accessToken')}), done);
}

exports.callFunction = function (options, done) {
  return makeRequest(_.merge({}, options, {path: '/devices/'+conf.get('deviceId')+'/'+options.functionName+'?access_token='+conf.get('accessToken')}), done);
}

exports.eventListen = function (options, done) {
  return makeRequest(_.merge({}, options, {path: '/devices/'+conf.get('deviceId')+'/events/'+options.eventName+'?access_token='+conf.get('accessToken')}), done);
}

exports.runFunction = function (options, done) {
  return makeRequest(_.merge({}, options, {path: '/devices/'+conf.get('deviceId')+'/'+options.functionName, cmd:{pin: options.pin, value:options.value}, method: 'POST'}), done);
}

function makeRequest(options, done){
  return q.fcall( function() {
    return conf.get('accessToken');
  })
    .then(function(accessToken){
      return performRequest(options);
    })
    .then(function(response){
      if (done) done(response);
      return response;
    }, function(err){
      if (done) done(err);
      throw err;
    });
}

function performRequest(options) {
  var deferred = q.defer();

  var url = conf.get('serviceUrl') + options.path;
  var accessToken = conf.get('accessToken');
  var headers = {};
  var body;

  // All requests to the API should have an accessToken

  if (options.method && options.method=="POST"){
    headers = {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    body = "access_token="+conf.get('accessToken');
    if (options.cmd){
      body+="&params="+options.cmd.pin+","+options.cmd.value;
    }
  }

  request({
    method: options.method || 'GET',
    url: url,
    qs: options.query,
    body: body,
    json: options.json,
    headers: headers,
    timeout: conf.get('requestTimeout')
  }, function (e, r, body) {
    var response,
      error = e;
    try {
      if (!error) {
        response = _.isString(body) ? JSON.parse(body) : body;
        if (response.errors) {
          var apiError = extend({}, response.errors[0]);
          error = new Error(apiError.message);
          error.code = apiError.code;
        }
        else if (response.error) {
          error = new Error(response.error_description);
          error.code = response.error;
        }
      }

      if (error && (error.code === 'invalid_token' || error.code === 'not_authenticated')) {
        error.status = 401;
      }
    }
    catch (err) {
      error = err;
    }

    if (error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(response);
    }
  });

  return deferred.promise;
}

/**
 * public interfaces
 */
//extend(module.exports, services);