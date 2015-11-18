var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user){
    res.json(user);
  });
});

module.exports = router;
