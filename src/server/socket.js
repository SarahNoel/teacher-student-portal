module.exports=function(e){var n=[];e.on("connection",function(o){console.log("connected!"),o.on("login",function(e){o.room=e,o.join(e)}),o.on("entered",function(s){o.user=s.username,-1===n.indexOf(s.username)&&s!==!1&&n.push(s.username),e.to(o.room).emit("online-users",n)}),o.on("message-sent",function(n){e.to(o.room).emit("message-received",{message:n,user:o.user})}),o.on("dm-sent",function(n,s){o.join(n),e.to(n).emit("dm-received",{user:o.user,message:s})}),o.on("teacher text",function(n){e.to(o.room).emit("message-received",{message:n,user:"Teacher"})}),o.on("disconnect",function(){var s=n.indexOf(o.user);n.splice(s,1),e.emit("user left",{user:o.user,users:n})}),o.on("logout",function(){o.disconnect()})})};

// module.exports = function(io) {
//     var users = [];

//   //-------------- SOCKETS --------------\\
//   io.on('connection', function(socket) {
//     console.log("connected!");

//     //******  CHAT SOCKET  ******\\

//     //enters teacher specific room on login
//     socket.on('login', function(room){
//       socket.room = room;
//       socket.join(room);
//     });

//     //when user enters chat room
//     socket.on('entered', function(user){
//       socket.user = user.username;
//       if(users.indexOf(user.username) === -1 && user !== false){
//         users.push(user.username);
//       }
//       io.to(socket.room).emit('online-users', users);
//     });

//     //message sent to whole room
//     socket.on('message-sent', function(message){
//       io.to(socket.room).emit('message-received', {message:message, user:socket.user});
//     });

//     ///direct messaging
//     socket.on('dm-sent', function(room, message) {
//       socket.join(room);
//       io.to(room).emit('dm-received', {user:socket.user, message:message});
//     });

//     //working on dynamic teacher text- NOT WORKING
//     socket.on('teacher text', function(message){
//       io.to(socket.room).emit('message-received', {message:message, user:'Teacher'});
//     });

//     //removes from users when disconnects
//     socket.on('disconnect', function(){
//       var index = users.indexOf(socket.user);
//       users.splice(index, 1);
//       io.emit('user left', {user:socket.user, users:users});
//     });

//     //disconnects on logout
//     socket.on('logout', function(){
//       socket.disconnect();
//     });

//   });

// };

