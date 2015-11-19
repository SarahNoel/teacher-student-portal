var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../../_config');
var Student = mongoose.model('students');
var Teacher = mongoose.model('teachers');


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

//get all students from a teacher
router.get('/students/:teacherID', function(req, res, next){
  Teacher.findById(req.params.teacherID, function(err, teacher){})
  .populate('students')
  .exec(function(err, teacher){
    if(err){
      res.json(err);
    }
    else{
      res.json(teacher);
    }
  });
});


//login one student
router.post('/login', function(req, res, next){
  var query = {email:req.body.email};
  Student.findOne(query,{'email':1, 'password':1, 'username':1, 'vocabGamesPlayed':1, 'vocabGamesWon':1, 'vocabGamesLost':1}, function(err, student){
    console.log(student);
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
  var payload = {email:req.body.email, password:req.body.password, username:req.body.username};
  var query = {keyword: req.body.keyword};
  Teacher.findOne(query, function(err, teacher){
    console.log('err1 ', err);
    if(err){
      res.json("Sorry! Inccorect keyword.");
    }
    if(teacher){
      var newStudent = new Student(payload);
      newStudent.save(function(err, student){
        console.log('err2 ', err);
        console.log('student2 ', student);
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

















