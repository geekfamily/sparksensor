'use strict';

  angular.module('sparksensorApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http, $resource, mySocket) {

    $scope.devices = [];
    $scope.ledOn = false;
    $scope.move = false;
    $scope.motion = "No Movement"

    $resource('/api/sparkcore/devices').get().$promise.then(success, fail);

    $resource('/api/sparkcore/function',{functionName:'temperature'}).get().$promise.then(tempSuccess, tempFail);

    $resource('/api/sparkcore/event',{eventName:'MotionSensor', pin:'' , value:'' }).get().$promise.then(moveSuccess, moveFail);

    function success(res){
      $scope.devices = res.result || res;
    };

    function fail(res){

    };

    $scope.lightOn = function(){
      $resource('/api/sparkcore/function',{functionName:'led', pin:'D1', value:'HIGH'},{function: {method:'POST'}}).save().$promise.then(ledSuccess, ledFail);
    };

    $scope.lightOff = function(){
      $resource('/api/sparkcore/function',{functionName:'led', pin:'D1', value:'LOW'},{function: {method:'POST'}}).save().$promise.then(ledSuccess, ledFail);
    };

    function ledSuccess(res){
      $scope.ledOn = !$scope.ledOn;
    };

    function ledFail(res){

    };

    function tempSuccess(res){
      var voltage = res.result.result || res;
      voltage = (voltage * 3.3)/4095;
      $scope.tempC = (voltage - 0.5) * 100;
      $scope.tempF = ($scope.tempC * (9.0 / 5.0)) + 32.0;
    };

    function tempFail(res){

    };

    function moveSuccess(res){
      var motion = res.result.result || res;
      $scope.motion = motion===1?"YES":"NO";
    };

    function moveFail(res){
      $scope.motion = "YES";
    };

    mySocket.on('motion_event', function (value, callback) {
      var event = JSON.parse(value);
      if (event.motion==1){
        $scope.motion = "Movement"
      } else {
        $scope.motion = "No Movement"
      }
//      callback();
    });

  });