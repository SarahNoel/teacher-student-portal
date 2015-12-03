var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var ChatMessage = mongoose.model('chatMessages');
var User = mongoose.model('teachers');

//------------ TWILIO ROUTES ---------------//

//twilio stuff
var config = require('../../../_config.js');
var client = require('twilio')(config.accountSid, config.authToken);


var teacherID;
var teacherName;

router.post('/teacher', function(req, res, next){
  var newMessage = new ChatMessage({user:teacherName, message:req.body.Body});
  newMessage.save(function(err, message){
     if(err){
      res.json(err);
    }
    var update = {$push:{chatMessages : newMessage}};
    var options = {new:true};
    User.findByIdAndUpdate(teacherID, update, options, function(err, data){
      if (err){
        res.json(err);
      }
      else{
        res.json(newMessage);
      }
    });
  });
});


// sends alert to teacher when @teacher is used
router.post('/twilio', function(req, res, next){
  teacherID = req.body.id;
  teacherName= req.body.name;
  var client = require('twilio')(config.accountSid, config.authToken);

  //send alert to teacher
    client.messages.create({
      to: "3035200766",
      from: "+18164488136",
      body: req.body.message
    }, function(err, message) {
      if(err){
        res.json(err);
      }
      else{
        res.json(message);
      }
    });
});

//------------ CHAT MESSAGE ROUTES ---------------//

//post save message to teacher
router.post('/message', function(req, res, next) {
  var newMessage = new ChatMessage({user:req.body.user, message:req.body.message});
  newMessage.save(function(err, message){
     if(err){
      res.json(err);
    }
    var messageID = newMessage._id;
    var update = {$push:{chatMessages : newMessage}};
    var options = {new:true};
    teacherID = req.body.id;
    teacherName= req.body.name;
    User.findByIdAndUpdate(teacherID, update, options, function(err, data){
      if (err){
        res.json(err);
      }
      else{
        res.json(newMessage);
      }
    });
  });
});

//get all teacher messages
router.get('/messages/:id', function(req, res, next) {
  User.findById(req.params.id)
    .deepPopulate('chatMessages')
    .exec(function(err, data){
      if(err){
        res.json(err);
      }
      else{
        res.json(data);
      }
  });
});


module.exports = router;
