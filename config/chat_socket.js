module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});
  
    io.sockets.on('connection',function(socket){
      console.log('socket connected!');
  
      socket.on('new-user-joined', data => {
        socket.join(data.chatRoom);
        socket.broadcast.to(data.chatRoom).emit('user_joined', data);
        socket.userName = data.user_name;
      });
  
      socket.on('send_message', function(data){
        io.to(data.chatRoom).emit('receive_message', data);
      });
  
      socket.on('disconnect', function() {
        socket.broadcast.emit('leave',{user_name:socket.userName});
      });
    });
  };
  