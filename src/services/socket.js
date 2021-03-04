import socketio from 'socket.io-client';

const socket = socketio('http://147.135.94.134:3000', {
  autoConnect: false,
});

function subscribeToNewUsers(subcribeFunction) {
  socket.on('msg', subcribeFunction);
}

function connect(join) {
  socket.io.opts.query = {
    join
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewUsers,
};