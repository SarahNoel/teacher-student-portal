var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Resource = mongoose.model('resources');
var User = mongoose.model('teachers');


//get one resource by id
router.get('/:id', function(req, res, next) {
  Resource.findById(req.params.id, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//PUT-update one resource by id
router.put('/:id', function(req, res, next) {
  var options = {new:true};
  var update = {title: req.body.title, url: req.body.url, description: req.body.description};
  Resource.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//get all resources- from user
router.get('/:userID', function(req, res, next) {
  User.findById(req.params.userID, function(err,data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

//post-add one resource to user
router.post('/:id', function(req, res, next) {
  var newResource = new Resource(req.body);
  newResource.save(function(err, game){
     if(err){
      error = err;
    }
    var update = {$push:{resources : newResource}};
    var options = {new:true};
    User.findByIdAndUpdate(req.params.id, update, options)
    .deepPopulate('resources')
    .exec(function(err, data){
      if (err){
        error = err;
        res.json(error);
      }
      else{
        res.json(data);
      }
    });
  });
});


//delete game
router.delete('/game/:id', function(req, res, next) {
  Resource.findByIdAndRemove(req.params.id, function(err, data){
     if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});


module.exports = router;
