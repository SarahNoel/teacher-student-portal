function ensureAuthenticated(e,o,s){if(!e.headers||!e.headers.authorization)return o.status(400).send({message:"You did not provide a JSON Web Token in the authorization header."});var r=e.headers.authorization.split(" "),n=r[1],t=jwt.decode(n,config.TOKEN_SECRET),a=moment().unix();return a>t.exp?o.status(401).send({message:"Token has expired. "}):void User.findById(t.sub,function(r,n){return n?(e.user=n,void s()):o.status(400).send({message:"User no longer exists. "})})}function createToken(e){var o={exp:moment().add(14,"days").unix(),iat:moment().unix(),sub:e._id};return jwt.encode(o,config.TOKEN_SECRET)}var express=require("express"),router=express.Router(),moment=require("moment"),jwt=require("jwt-simple"),mongoose=require("mongoose"),config=require("../../../_config"),User=mongoose.model("teachers"),deepPopulate=require("mongoose-deep-populate")(mongoose);router.post("/signup",function(e,o){User.findOne({email:e.body.email},function(s,r){if(r)return o.status(409).send({message:"Email is already taken"});var n=new User({username:e.body.username,email:e.body.email,password:e.body.password,keyword:e.body.keyword,phone:e.body.phone});n.save(function(){var e=createToken(n);o.send({token:e,user:n})})})}),router.post("/login",function(e,o){User.findOne({email:e.body.email},"+password",function(s,r){return r?void r.comparePassword(e.body.password,function(e,s){if(!s)return o.status(401).send({message:"Wrong email address and/or password"});r=r.toObject(),delete r.password;var n=createToken(r);o.send({token:n,user:r})}):o.status(401).send({message:{email:"Incorrect email"}})})}),router.get("/teacher/:id",function(e,o,s){User.findById(e.params.id,function(e,s){e?o.json(e):o.json(s)})}),module.exports=router;
// var express = require('express');
// var router = express.Router();
// var moment = require('moment');
// var jwt = require('jwt-simple');
// var mongoose = require('mongoose');
// var config = require('../../../_config');
// var User = mongoose.model('teachers');
// var deepPopulate = require("mongoose-deep-populate")(mongoose);
// // var User = require('../models/user.js');


// // *** login required *** //
// function ensureAuthenticated(req, res, next) {
//   if (!(req.headers && req.headers.authorization)) {
//     return res.status(400).send({
//       message: 'You did not provide a JSON Web Token in the authorization header.'
//     });
//   }

//   // decode the token
//   var header = req.headers.authorization.split(' ');
//   var token = header[1];
//   var payload = jwt.decode(token, config.TOKEN_SECRET);
//   var now = moment().unix();

//   // check if the token has expired
//   if (now > payload.exp) {
//     return res.status(401).send({
//       message: 'Token has expired. '
//     });
//   }

//   // check if the user still exists in the db
//   User.findById(payload.sub, function(err, user) {
//     if (!user) {
//       return res.status(400).send({
//         message: 'User no longer exists. '
//       });
//     }
//     req.user = user;
//     next();
//   });
// }

// // *** generate token *** //
// function createToken(user) {
//   var payload = {
//     exp: moment().add(14, 'days').unix(),
//     iat: moment().unix(),
//     sub: user._id
//   };
//   return jwt.encode(payload, config.TOKEN_SECRET);
// }

// // *** register route *** //
// router.post('/signup', function(req, res) {
//   User.findOne({email: req.body.email}, function(err, existingUser) {
//     if (existingUser) {
//       return res.status(409).send({
//         message: 'Email is already taken'
//       });
//     }
//     var user = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       keyword: req.body.keyword,
//       phone: req.body.phone
//     });
//     user.save(function() {
//       var token = createToken(user);
//       res.send({
//         token: token,
//         user: user
//       });
//     });
//   });
// });

// // *** login route *** //
// router.post('/login', function(req, res) {
//   User.findOne({email: req.body.email}, '+password', function(err, user) {
//     if (!user) {
//       return res.status(401).send({
//         message: {
//           email: 'Incorrect email'
//         }
//       });
//     }
//     user.comparePassword(req.body.password, function(err, isMatch) {
//       if (!isMatch) {
//         return res.status(401).send({
//           message: 'Wrong email address and/or password'
//         });
//       }
//       user = user.toObject();
//       delete user.password;
//       var token = createToken(user);
//       res.send({
//         token: token,
//         user: user
//       });
//     });
//   });
// });

// // *** get one teacher by id *** \\
// router.get('/teacher/:id', function(req, res, next) {
//   User.findById(req.params.id, function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });


// module.exports = router;
