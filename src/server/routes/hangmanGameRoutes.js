var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var HangmanGame = mongoose.model('hangmanGames');
var User = mongoose.model('teachers');


//get one game by id
router.get('/game/:id', function(req, res, next) {
  HangmanGame.findById(req.params.id, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//PUT-update one game by id
router.put('/game/:id', function(req, res, next) {
  var options = {new:true};
  var update = {title: req.body.title, words: req.body.words};
  HangmanGame.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


//get all games- global
router.get('/games', function(req, res, next) {
  HangmanGame.find(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//get all games- from user
router.get('/games/:userID', function(req, res, next) {
  User.findById(req.params.userID, function(err,data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//post-add one game to user
router.post('/game', function(req, res, next) {
  var error;
  var newGame = new HangmanGame(req.body);
  newGame.save(function(err, game){
     if(err){
      error = err;
    }
    var update = {$push:{hangmanGames : newGame}};
    var options = {new:true};
    var gameID = newGame._id;
    User.findByIdAndUpdate(req.body.teacherID, update, options)
    .deepPopulate()
    .exec(function(err, data){
      if (err){
        error = err;
        res.json(error);
      }
      else{
        res.json({game:newGame, gameID:gameID});
      }
    });
  });
});


//delete game
router.delete('/game/:id', function(req, res, next) {
  HangmanGame.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


module.exports = router;
