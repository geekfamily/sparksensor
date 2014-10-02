'use strict';

var express = require('express');
var controller = require('./services.controller.js');

var spark = {

  devices: function (req, res) {
    controller.getDevices({}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
      var devices = [];
      if (result && result.length>0){
        for (var i=0;i<result.length;i++){
          devices.push({name: result[i].name, lastApp: result[i].lastApp, lastHeard: result[i].lastHeard});
        }
      }
      res.type('application/json').send(statusCode, {metadata: {}, result:devices});
    });
  },

  callFunction: function (req, res) {
    controller.callFunction({functionName:req.query.functionName, pin:req.query.pin, value:req.query.value}, function(err, data){
      if (err){
        res.type('application/json').send(statusCode, {metadata: {}, result:err});
      } else {
        var status;
        var statusCode = status || 200;
        res.type('application/json').send(statusCode, {metadata: {}, result:data});
      }
    });
  },

  runFunction: function (req, res) {
    controller.runFunction({functionName:req.query.functionName, pin:req.query.pin, value:req.query.value}, function(err, data){
      if (err){
        res.type('application/json').send(statusCode, {metadata: {}, result:err});
      } else {
        var status;
        var statusCode = status || 200;
        res.type('application/json').send(statusCode, {metadata: {}, result:data});
      }
    });
  },

  eventListen: function (req, res) {
    controller.eventListen({eventName:req.query.eventName, pin:req.query.pin,value:req.query.value}, function(result){
      var err = {};
      var status;
      var statusCode = status || 200;
//      ServiceResponse({result: devices}).send(res);;
//      res.type('application/json').send(statusCode, {metadata: {}, result:result});
    });
  }

};

function ServiceResponse(res, result, status){
  var statusCode = status || 200;
  res.type('application/json').send(statusCode, {metadata: {}, result:devices});
}

exports.spark = spark;

