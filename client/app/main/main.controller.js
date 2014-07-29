'use strict';

angular.module('sparksensorApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.lightOn = function(){
      var test;
    };

    $scope.lightOff = function(){
      var test;
    };

  });