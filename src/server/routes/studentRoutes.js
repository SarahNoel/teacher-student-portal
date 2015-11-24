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
  .deepPopulate('hangmanGames vocabGames students flashcardSets')
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
  Student.findOne(query,{'email':1, 'password':1, 'username':1, 'vocabGamesPlayed':1, 'vocabGamesWon':1, 'vocabGamesLost':1, 'teacherID':1}, function(err, student){
    if(err){
      res.json(err);
    }
    else{
      if(req.body.password === student.password){
        res.json(student);
      }
      else{
        res.json("Sorry, incorrect password!");
      }
    }
  });
});


//register a new student
router.post('/register', function(req, res, next){
  var query = {keyword: req.body.keyword};
  Teacher.findOne(query, function(err, teacher){
    if(err){
      res.json("Sorry! Inccorect keyword.");
    }
    if(teacher){
      var payload = {email:req.body.email, password:req.body.password, username:req.body.username, teacherID: teacher._id};
      var newStudent = new Student(payload);
      newStudent.save(function(err, student){
        if(err){
          res.json('Sorry! That email is already registered.');
        }
        if(student){
          var options = {new:true};
          var update = {$push:{students:newStudent}};
          Teacher.findOneAndUpdate(query, update, options, function(err, data){
            if(err){
              res.json(err);
            }
            res.json(newStudent);
          });

        }
      });
    }
  });


});




module.exports = router;

















