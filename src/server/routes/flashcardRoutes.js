
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var FlashcardSet = mongoose.model('flashcardSets');
var Flashcard = mongoose.model('flashcards');
var User = mongoose.model('students');
var Teacher = mongoose.model('teachers');


//------------- FLASHCARD SET ROUTES ----------------//

//get one set by id
router.get('/set/:id', function(req, res, next) {
  FlashcardSet.findById(req.params.id)
    .deepPopulate('flashcards')
    .exec(function(err, data){
      if(err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(data);
      }
  });
});

//get all sets and cards from STUDENT
router.get('/sets/:userID', function(req, res, next) {
  User.findById(req.params.userID)
  .deepPopulate('flashcardSets flashcards')
    .exec(function(err, data){
      if (err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(data);
      }
    });
});


//get all sets and cards from TEACHER
router.get('/teachersets/:userID', function(req, res, next) {
  Teacher.findById(req.params.userID)
  .deepPopulate('flashcardSets flashcards')
    .exec(function(err, data){
      if (err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(data);
      }
    });
});

//post-add one set to STUDENT
router.post('/set', function(req, res, next) {
  var newSet = new FlashcardSet({title:req.body.title});
  newSet.save(function(err, set){
     if(err){
      error = err;
    }
    var setID = newSet._id;
    var title = newSet.title;
    var update = {$push:{flashcardSets : newSet}};
    var options = {new:true};
    User.findByIdAndUpdate(req.body.id, update, options)
    .deepPopulate('flashcardSets flashcards')
    .exec(function(err, data){
      if (err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json({user:data, setID:setID, title:title});
      }
    });
  });
});

//post-add one set to TEACHER
router.post('/teacherset', function(req, res, next) {
  var newSet = new FlashcardSet({title:req.body.title});
  newSet.save(function(err, set){
     if(err){
      error = err;
    }
    var setID = newSet._id;
    var title = newSet.title;
    var update = {$push:{flashcardSets : newSet}};
    var options = {new:true};
    Teacher.findByIdAndUpdate(req.body.id, update, options)
    .deepPopulate('flashcardSets flashcards')
    .exec(function(err, data){
      if (err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json({user:data, setID:setID, title:title});
      }
    });
  });
});


//PUT-update one set by id
router.put('/set/:id', function(req, res, next) {
  var options = {new:true};
  var update = {title: req.body.title};
  FlashcardSet.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});

//delete set
router.delete('/set/:id', function(req, res, next) {
  FlashcardSet.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});


//---------------- FLASHCARD ROUTES ----------------//

//get one card by id
router.get('/card/:id', function(req, res, next) {
  Flashcard.findById(req.params.id)
    .deepPopulate()
    .exec(function(err, data){
      if(err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(data);
      }
  });
});

//post-add one card to set
router.post('/card', function(req, res, next) {
  var newCard = new Flashcard({question:req.body.question, answer:req.body.answer});
  newCard.save(function(err, card){
    if(card){
    var update = {$push:{flashcards : newCard}};
    var options = {new:true};
    FlashcardSet.findByIdAndUpdate(req.body.setID, update, options)
    .deepPopulate('flashcards')
    .exec(function(err, data){
      if (err){
        res.status(500).json(err);
      }
      else{
        res.status(200).json(data);
      }
    });
    }
  });
});


//PUT-update one flashcard by id
router.put('/card/:id', function(req, res, next) {
  var options = {new:true};
  var update = {question : req.body.question , answer: req.body.answer};
  Flashcard.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});


//delete Flashcard
router.delete('/card/:id', function(req, res, next) {
  Flashcard.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json(data);
    }
  });
});



module.exports = router;
