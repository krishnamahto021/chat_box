module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});

    io.sockets.on('connection',function(socket){
        console.log('socket connected!');

        socket.on('new-user-joined', data => {
            socket.join(data.chatRoom);
            socket.broadcast.to(data.chatRoom).emit('user_joined', data);
        });

        socket.on('send_message',function(data){
            io.to(data.chatRoom).emit('recieve_message',data);

        })

        socket.on('disconnect',function(data){
            socket.broadcast.to('chatBox').emit('leave',data);
        })
    })
}