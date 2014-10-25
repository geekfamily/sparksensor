'use strict';


var io;

function setSocket(socketio){
  socketio.on('connection', function (socket) {
    io = socket;
  });
}

function emit(eventName, data, callback) {
  io.emit(eventName, data, function () {
    var args = arguments;

  });
}

function getSocket(){
  return io;
}


exports.setSocket = setSocket;
exports.getSocket = getSocket;
exports.emit = emit;
