var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../../_config');
var Student = mongoose.model('students');


//get all students
router.get('/students')






module.exports = router;
