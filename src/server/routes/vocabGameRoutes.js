var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var VocabGame = mongoose.model('vocabGames');
var VocabQuestion = mongoose.model('vocabQuestions');

//get one game
router.get('/game/:id', function(req, res, next) {
  VocabGame.findById(req.params.id)
  .populate('questions')
  .exec(function(err, data){
    if(err){
      res.json(err);
    }
    res.json(data);
  });
});

//get all games
router.get('/games', function(req, res, next) {
  VocabGame.find()
  .populate('questions')
  .exec(console.log('poop'), function(err, data){
    if(err){
      res.json(err);
    }
    res.json(data);
  });
});

//post-add one game
router.post('/game', function(req, res, next) {
  console.log(req.body);
  var newGame = new VocabGame(req.body);
  newGame.save(function(err, game){
     if(err){
      res.json(err);
    }
    res.json(game);
  });
});

//post-add one question
router.post('/question', function(req, res, next) {
  console.log(req.body);
  var question ={question: req.body.question, answer: req.body.answer};
  var id = req.body.id;
  var newQuestion = new VocabQuestion(question);
  newQuestion.save(function(err, question){
     if(err){
      res.json(err);
    }
    var update = {$push:{questions : question}};
    var options = {new:true};
    VocabGame.findByIdAndUpdate(id, update, options)
    .populate('questions')
    .exec(function(err, data){
    console.log(data);
    res.json(data);
    });
  });
});


module.exports = router;
