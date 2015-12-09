var express=require("express"),router=express.Router(),mongoose=require("mongoose"),deepPopulate=require("mongoose-deep-populate")(mongoose),HangmanGame=mongoose.model("hangmanGames"),User=mongoose.model("teachers");router.get("/game/:id",function(e,n,o){HangmanGame.findById(e.params.id,function(e,o){e?n.json(e):n.json(o)})}),router.put("/game/:id",function(e,n,o){var a={"new":!0},r={title:e.body.title,words:e.body.words};HangmanGame.findByIdAndUpdate(e.params.id,r,a,function(e,o){e?n.json(e):n.json(o)})}),router.get("/games",function(e,n,o){HangmanGame.find(function(e,o){e?n.json(e):n.json(o)})}),router.get("/games/:userID",function(e,n,o){User.findById(e.params.userID,function(e,o){e?n.json(e):n.json(o)})}),router.post("/game",function(e,n,o){var a,r=new HangmanGame(e.body);r.save(function(o,s){o&&(a=o);var t={$push:{hangmanGames:r}},m={"new":!0},d=r._id;User.findByIdAndUpdate(e.body.teacherID,t,m).deepPopulate().exec(function(e,o){e?(a=e,n.json(a)):n.json({game:r,gameID:d})})})}),router["delete"]("/game/:id",function(e,n,o){HangmanGame.findByIdAndRemove(e.params.id,function(e,o){e?n.json(e):n.json(o)})}),module.exports=router;

// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var deepPopulate = require("mongoose-deep-populate")(mongoose);
// var HangmanGame = mongoose.model('hangmanGames');
// var User = mongoose.model('teachers');


// //get one game by id
// router.get('/game/:id', function(req, res, next) {
//   HangmanGame.findById(req.params.id, function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });

// //PUT-update one game by id
// router.put('/game/:id', function(req, res, next) {
//   var options = {new:true};
//   var update = {title: req.body.title, words: req.body.words};
//   HangmanGame.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });


// //get all games- global
// router.get('/games', function(req, res, next) {
//   HangmanGame.find(function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });

// //get all games- from user
// router.get('/games/:userID', function(req, res, next) {
//   User.findById(req.params.userID, function(err,data){
//      if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });

// //post-add one game to user
// router.post('/game', function(req, res, next) {
//   var error;
//   var newGame = new HangmanGame(req.body);
//   newGame.save(function(err, game){
//      if(err){
//       error = err;
//     }
//     var update = {$push:{hangmanGames : newGame}};
//     var options = {new:true};
//     var gameID = newGame._id;
//     User.findByIdAndUpdate(req.body.teacherID, update, options)
//     .deepPopulate()
//     .exec(function(err, data){
//       if (err){
//         error = err;
//         res.json(error);
//       }
//       else{
//         res.json({game:newGame, gameID:gameID});
//       }
//     });
//   });
// });


// //delete game
// router.delete('/game/:id', function(req, res, next) {
//   HangmanGame.findByIdAndRemove(req.params.id, function(err, data){
//      if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });


// module.exports = router;
