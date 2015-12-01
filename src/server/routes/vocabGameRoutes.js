var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var VocabGame = mongoose.model('vocabGames');
var VocabQuestion = mongoose.model('vocabQuestions');
var User = mongoose.model('teachers');


//get one game by id
router.get('/game/:id', function(req, res, next) {
  VocabGame.findById(req.params.id)
  .deepPopulate('questions')
  .exec(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


//get one question by id
router.get('/question/:id', function(req, res, next) {
  VocabQuestion.findById(req.params.id, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//PUT-update one question by id
router.put('/question/:id', function(req, res, next) {
  var options = {new:true};
  VocabQuestion.findByIdAndUpdate(req.params.id, req.body, options, function(err, data){
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
  var update = {title: req.body.title};
  VocabGame.findByIdAndUpdate(req.params.id, update, options, function(err, data){
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
  VocabGame.find()
  .deepPopulate('questions')
  .exec(function(err, data){
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
  User.findById(req.params.userID)
  .populate('vocabGames')
  .exec(function(err,data){
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
  var newGame = new VocabGame(req.body);
  newGame.save(function(err, game){
     if(err){
      error = err;
    }
    var update = {$push:{vocabGames : newGame}};
    var options = {new:true};
    var gameID = newGame._id;
    User.findByIdAndUpdate(req.body.teacherID, update, options)
    .deepPopulate('questions')
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

//post-add one question to a game
router.post('/question', function(req, res, next) {
  var payload ={question: req.body.question, answer: req.body.answer};
  var id = req.body.id;
  var newQuestion = new VocabQuestion(payload);
  newQuestion.save(function(err, question){
     if(err){
      res.json(err);
    }
    var update = {$push:{questions : newQuestion}};
    var options = {new:true};
    VocabGame.findByIdAndUpdate(id, update, options)
    .deepPopulate('questions')
    .exec(function(err, data){
      if (err){
        res.json(err);
      }
      else{
        res.json(data);
      }
    });
  });
});

//delete Game
router.delete('/game/:id', function(req, res, next) {
  VocabGame.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//delete question
router.delete('/question/:id', function(req, res, next) {
  VocabQuestion.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


module.exports = router;
