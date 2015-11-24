var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var FlashcardSet = mongoose.model('flashcardSets');
var User = mongoose.model('students');

//get one set by id
router.get('/set/:id', function(req, res, next) {
  FlashcardSet.findById(req.params.id, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//PUT-update one game by id
router.put('/set/:id', function(req, res, next) {
  var options = {new:true};
  var update = {title: req.body.title, words: req.body.words};
  FlashcardSet.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


//get all games- global
router.get('/sets', function(req, res, next) {
  FlashcardSet.find(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//get all games- from user
router.get('/sets/:userID', function(req, res, next) {
  User.findById(req.params.userID)
  .deepPopulate('flashcardSets')
    .exec(function(err, data){
      if (err){
        res.json(err);
      }
      else{
        res.json(data);
      }
    });
});

//post-add one set to user
router.post('/set', function(req, res, next) {
  var newSet = new FlashcardSet(req.body.set);
  newSet.save(function(err, set){
     if(err){
      error = err;
    }
    var update = {$push:{flashcardSets : newSet}};
    var options = {new:true};
    User.findByIdAndUpdate(req.body.id, update, options)
    .deepPopulate('flashcardSets')
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


//delete game
router.delete('/game/:id', function(req, res, next) {
  FlashcardSet.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


module.exports = router;
