'use strict';

var express = require('express');
var controller = require('./services.controller.js');

//var router = express.Router();

var spark = {

  devices: function (req, res) {
    controller.getDevices({}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
//      ServiceResponse({result: devices}).send(res);
      if (result && result.length>0){
        for (var i=0;i<result.length;i++){
          result[i].id=null;
        }
      }
      res.type('application/json').send(statusCode, {metadata: {}, result:result});
    });
  },

  callFunction: function (req, res) {
    controller.callFunction({functionName:req.query.functionName, pin:req.query.pin,value:req.query.value}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
//      ServiceResponse({result: devices}).send(res);;
      res.type('application/json').send(statusCode, {metadata: {}, result:result});
    });
  },

  runFunction: function (req, res) {
    controller.runFunction({functionName:req.query.functionName, pin:req.query.pin,value:req.query.value}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
//      ServiceResponse({result: devices}).send(res);;
      res.type('application/json').send(statusCode, {metadata: {}, result:result});
    });
  },

  eventListen: function (req, res) {
    controller.eventListen({eventName:req.query.eventName, pin:req.query.pin,value:req.query.value}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
//      ServiceResponse({result: devices}).send(res);;
      res.type('application/json').send(statusCode, {metadata: {}, result:result});
    });
  }

};

function ServiceResponse(res, result, status){
  var statusCode = status || 200;
  res.type('application/json').send(statusCode, {metadata: {}, result:devices});
}

exports.spark = spark;

