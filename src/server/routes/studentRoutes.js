var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var config = require('../../../_config');
var Student = mongoose.model('students');
var Teacher = mongoose.model('teachers');
var HangmanGame = mongoose.model('hangmanGames');

//get all students
router.get('/students', function(req, res, next){
  Student.find(function(err, students){
    if(err){
      res.json(err);
    }
    else{
      res.json(students);
    }
  });
});

//get all students and games from a teacher
router.get('/students/:teacherID', function(req, res, next){
  Teacher.findById(req.params.teacherID, function(err, teacher){})
  .deepPopulate('hangmanGames vocabGames students flashcardSets conversations students.conversations resources')
  .exec(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//login one student
router.post('/login', function(req, res, next){
  var query = {email:req.body.email};
  Student.findOne(query,{'email':1, 'password':1, 'username':1, 'vocabGamesPlayed':1, 'vocabGamesWon':1, 'vocabGamesLost':1, 'teacherID':1, 'conversations':1, 'flashcardSets':1}, function(err, student){
    if(!student){
      res.json({err:"Sorry, that email isn't registered."});
    }
    else{
      if(req.body.password === student.password){
        res.json(student);
      }
      else{
        res.json({err:"Sorry, incorrect password!"});
      }
    }
  });
});


//register a new student
router.post('/register', function(req, res, next){
  var match = false;
  var teacherID;
  var query = {keyword: req.body.keyword};
  Teacher.find(function(err, teachers){
    for (var i = 0; i < teachers.length; i++) {
      if(teachers[i].keyword === req.body.keyword){
        match = true;
        teacherID = teachers[i]._id;
      }
    }
    if(!match){
      res.json({err:"Sorry! Incorrect keyword."});
    }
    else{
      var payload = {email:req.body.email, password:req.body.password, username:req.body.username, teacherID: teacherID};
      var newStudent = new Student(payload);
      newStudent.save(function(err, student){
        if(err){
          res.json({err:'Sorry! That email is already registered.'});
        }
        if(student){
          var options = {new:true};
          var update = {$push:{students:newStudent}};
          Teacher.findOneAndUpdate(query, update, options, function(err, data){
            if(err){
              res.json({err:err});
            }
            res.json(newStudent);
          });

        }
      });
    }
  });
});


module.exports = router;

















