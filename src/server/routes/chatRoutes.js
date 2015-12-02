var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var ChatMessage = mongoose.model('chatMessages');
var User = mongoose.model('teachers');


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
    User.findByIdAndUpdate(req.body.id, update, options, function(err, data){
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
