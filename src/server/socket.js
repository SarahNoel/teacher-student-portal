var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var ChatMessage = mongoose.model('chatMessages');
var User = mongoose.model('teachers');
var Student = mongoose.model('students');
var Conversation = mongoose.model('conversations');

//------------ TWILIO ROUTES ---------------//

//twilio stuff
var config = require('../../_config.js');
var client = require('twilio')(config.accountSid, config.authToken);
var teacherID;
var teacherName;


module.exports = function(io) {
  //-------------- SOCKETS --------------\\
  io.on('connection', function(socket) {
    console.log("connected!");

    //******  CHAT SOCKET  ******\\
    var users = [];

  //teacher replies to text
  router.post('/teacher', function(req, res, next){
    var newMessage = new ChatMessage({user:teacherName, message:req.body.Body});
    newMessage.save(function(err, message){
       if(err){
        res.json(err);
      }
      var update = {$push:{chatMessages : newMessage}};
      var options = {new:true};
      User.findByIdAndUpdate(teacherID, update, options, function(err, user){
        if (err){
          res.json(err);
        }
        else{
          var client = require('twilio')(config.accountSid, config.authToken);
            //send response to teacher
            client.messages.create({
              to: user.phone,
              from: "+18164488136",
              body: "Your message has been received!"
            });
          res.json(newMessage);
          //emit for socket!!! for dynamic updating
          socket.emit("teacher text");

        }
      });
    });
  });







    //enters teacher specific room on login
    socket.on('login', function(room){
      socket.room = room;
      socket.join(room);
    });

    //when user enters chat room
    socket.on('entered', function(user){
      if(users.indexOf(user.username) === -1 && user !== false){
        users.push(user.username);
      }
      socket.user = user.username;
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
      console.log("MADE IT HERE");
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

module.exports = router;
};

