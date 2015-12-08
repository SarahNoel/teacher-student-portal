module.exports = function(io) {
    var users = [];

  //-------------- SOCKETS --------------\\
  io.on('connection', function(socket) {
    console.log("connected!");

    //******  CHAT SOCKET  ******\\

    //enters teacher specific room on login
    socket.on('login', function(room){
      socket.room = room;
      socket.join(room);
    });

    //when user enters chat room
    socket.on('entered', function(user){
      socket.user = user.username;
      if(users.indexOf(user.username) === -1 && user !== false){
        users.push(user.username);
      }
      io.to(socket.room).emit('online-users', users);
    });

    //message sent to whole room
    socket.on('message-sent', function(message){
      io.to(socket.room).emit('message-received', {message:message, user:socket.user});
    });


    ///direct messaging

    //send dm
    socket.on('dm-sent', function(room, message) {
      socket.join(room);
      io.to(room).emit('dm-received', {user:socket.user, message:message});
    });

    //working on dynamic teacher text- NOT WORKING
    socket.on('teacher text', function(message){
      io.to(socket.room).emit('message-received', {message:message, user:'Teacher'});
    });

    //removes from users when disconnects
    socket.on('disconnect', function(){
      var index = users.indexOf(socket.user);
      users.splice(index, 1);
      io.emit('user left', {user:socket.user, users:users});
    });

    //disconnects on logout
    socket.on('logout', function(){
      socket.disconnect();
    });

  });

};

