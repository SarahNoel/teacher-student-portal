var express=require("express"),router=express.Router(),mongoose=require("mongoose"),deepPopulate=require("mongoose-deep-populate")(mongoose),ChatMessage=mongoose.model("chatMessages"),User=mongoose.model("teachers"),Student=mongoose.model("students"),Conversation=mongoose.model("conversations"),config=require("../../../_config.js"),client=require("twilio")(config.accountSid,config.authToken),teacherID,teacherName;router.post("/teacher",function(e,o,n){var s=new ChatMessage({user:teacherName,message:e.body.Body});s.save(function(e,n){e&&o.json(e);var t={$push:{chatMessages:s}},a={"new":!0};User.findByIdAndUpdate(teacherID,t,a,function(e,n){if(e)o.json(e);else{var t=require("twilio")(config.accountSid,config.authToken);t.messages.create({to:n.phone,from:"+18164488136",body:"Your message has been received!"}),o.json(s)}})})}),router.post("/twilio",function(e,o,n){teacherID=e.body.id,teacherName=e.body.name;var s=require("twilio")(config.accountSid,config.authToken);s.messages.create({to:e.body.phone,from:"+18164488136",body:e.body.message},function(e,n){e?o.json(e):o.json(n)})}),router.put("/disable/:id",function(e,o,n){var s={disabledAlerts:!0},t={"new":!0};Student.findByIdAndUpdate(e.params.id,s,t,function(e,n){e?o.json(e):o.json(n)})}),router.put("/enable/:id",function(e,o,n){var s={disabledAlerts:!1},t={"new":!0};Student.findByIdAndUpdate(e.params.id,s,t,function(e,n){e?o.json(e):o.json(n)})}),router.put("/disableAll/:id",function(e,o,n){var s={disabledAlerts:!0},t={"new":!0};User.findByIdAndUpdate(e.params.id,s,t,function(e,n){e?o.json(e):o.json(n)})}),router.put("/enableAll/:id",function(e,o,n){var s={disabledAlerts:!1},t={"new":!0};User.findByIdAndUpdate(e.params.id,s,t,function(e,n){e?o.json(e):o.json(n)})}),router.post("/message",function(e,o,n){var s=new ChatMessage({user:e.body.user,message:e.body.message});s.save(function(n,t){n&&o.json(n);var a=(s._id,{$push:{chatMessages:s}}),r={"new":!0};teacherID=e.body.id,teacherName=e.body.name,User.findByIdAndUpdate(teacherID,a,r,function(e,n){e?o.json(e):o.json(s)})})}),router.get("/messages/:id",function(e,o,n){User.findById(e.params.id).deepPopulate("chatMessages").exec(function(e,n){e?o.json(e):o.json(n)})}),router.get("/directmessages/:id",function(e,o,n){User.findById(e.params.id).deepPopulate("students students.conversations").exec(function(e,n){e?o.json(e):o.json({students:n.students,teacher:n.username})})}),router.get("/convo/:id",function(e,o,n){Conversation.findById(e.params.id).deepPopulate("messages").exec(function(e,n){e?o.json(e):o.json(n)})}),router.post("/convo",function(e,o,n){var s=new Conversation({users:e.body.users,room:e.body.room});s.save(function(n,t){if(n)o.json(n);else{var a={$push:{conversations:s}},r={"new":!0};Student.findByIdAndUpdate(e.body.id1,a,r,function(n,t){Student.findByIdAndUpdate(e.body.id2,a,r,function(e,n){o.json(s)})})}})}),router.post("/savetoconvo",function(e,o,n){var s=new ChatMessage({user:e.body.user,message:e.body.message});s.save(function(n,t){n&&o.json(n);var a={$push:{messages:s}},r={"new":!0};Conversation.findByIdAndUpdate(e.body.convoID,a,r,function(e,n){e?o.json(e):o.json(n)})})}),module.exports=router;

// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var deepPopulate = require("mongoose-deep-populate")(mongoose);
// var ChatMessage = mongoose.model('chatMessages');
// var User = mongoose.model('teachers');
// var Student = mongoose.model('students');
// var Conversation = mongoose.model('conversations');

// //------------ TWILIO ROUTES ---------------//

// //twilio stuff
// var config = require('../../../_config.js');
// var client = require('twilio')(config.accountSid, config.authToken);
// var teacherID;
// var teacherName;

// //teacher replies to text
// router.post('/teacher', function(req, res, next){
//   var newMessage = new ChatMessage({user:teacherName, message:req.body.Body});
//   newMessage.save(function(err, message){
//      if(err){
//       res.json(err);
//     }
//     var update = {$push:{chatMessages : newMessage}};
//     var options = {new:true};
//     User.findByIdAndUpdate(teacherID, update, options, function(err, user){
//       if (err){
//         res.json(err);
//       }
//       else{
//         var client = require('twilio')(config.accountSid, config.authToken);
//           //send response to teacher
//           client.messages.create({
//             to: user.phone,
//             from: "+18164488136",
//             body: "Your message has been received!"
//           });
//         res.json(newMessage);
//       }
//     });
//   });
// });


// // sends alert to teacher when @teacher is used
// router.post('/twilio', function(req, res, next){
//   teacherID = req.body.id;
//   teacherName= req.body.name;
//   var client = require('twilio')(config.accountSid, config.authToken);
//   //send alert to teacher
//     client.messages.create({
//       to: req.body.phone,
//       from: "+18164488136",
//       body: req.body.message
//     }, function(err, message) {
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json(message);
//       }
//     });
// });

// //disable a student from alerting teacher
// router.put('/disable/:id', function(req, res, next){
//   var update = {disabledAlerts : true};
//   var options = {new:true};
//   Student.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });

// //enable a student from alerting teacher
// router.put('/enable/:id', function(req, res, next){
//   var update = {disabledAlerts : false};
//   var options = {new:true};
//   Student.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });

// //disable all alerts from teacher
// router.put('/disableAll/:id', function(req, res, next){
//   var update = {disabledAlerts : true};
//   var options = {new:true};
//   User.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });

// //enable all alerts from teacher
// router.put('/enableAll/:id', function(req, res, next){
//   var update = {disabledAlerts : false};
//   var options = {new:true};
//   User.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });



// //------------ CHAT MESSAGE ROUTES ---------------//

// //post save message to teacher
// router.post('/message', function(req, res, next) {
//   var newMessage = new ChatMessage({user:req.body.user, message:req.body.message});
//   newMessage.save(function(err, message){
//      if(err){
//       res.json(err);
//     }
//     var messageID = newMessage._id;
//     var update = {$push:{chatMessages : newMessage}};
//     var options = {new:true};
//     teacherID = req.body.id;
//     teacherName= req.body.name;
//     User.findByIdAndUpdate(teacherID, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(newMessage);
//       }
//     });
//   });
// });

// //get all teacher messages
// router.get('/messages/:id', function(req, res, next) {
//   User.findById(req.params.id)
//     .deepPopulate('chatMessages')
//     .exec(function(err, data){
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });


// //------------ DIRECT MESSAGE ROUTES ---------------//

// //get all students to message
// router.get('/directmessages/:id', function(req, res, next) {
//   User.findById(req.params.id)
//     .deepPopulate('students students.conversations')
//     .exec(function(err, data){
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json({students:data.students, teacher:data.username});
//       }
//   });
// });


// //get one convo
// router.get('/convo/:id', function(req, res, next) {
//   Conversation.findById(req.params.id)
//     .deepPopulate('messages')
//     .exec(function(err, data){
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });


// //post save convo to student
// router.post('/convo', function(req, res, next) {
//   var newConvo = new Conversation({users:req.body.users, room:req.body.room});
//   newConvo.save(function(err, convo){
//     if(err){
//       res.json(err);
//     }
//     else{
//       var update = {$push:{conversations : newConvo}};
//       var options = {new:true};
//       Student.findByIdAndUpdate(req.body.id1, update, options, function(err, user){
//         Student.findByIdAndUpdate(req.body.id2, update, options, function(err, user){
//           res.json(newConvo);
//         });
//       });
//     }
//   });
// });


// //save message to convo
// router.post('/savetoconvo', function(req, res, next) {
//   var newMessage = new ChatMessage({user:req.body.user, message:req.body.message});
//   newMessage.save(function(err, message){
//      if(err){
//       res.json(err);
//     }
//     var update = {$push:{messages : newMessage}};
//     var options = {new:true};
//     Conversation.findByIdAndUpdate(req.body.convoID, update, options, function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//     });
//   });
// });


// module.exports = router;
