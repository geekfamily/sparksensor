'use strict';

module.exports = function(socketio){

  return {

    on: function(eventName, callback) {
      socketio.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socketio, args);
        });
      });
    },

    emit: function(eventName, data, callback) {
      socketio.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socketio, args);
          }
        });
      });
    }

  };

}
