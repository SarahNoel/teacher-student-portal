var express=require("express"),router=express.Router(),mongoose=require("mongoose"),deepPopulate=require("mongoose-deep-populate")(mongoose),FlashcardSet=mongoose.model("flashcardSets"),Flashcard=mongoose.model("flashcards"),User=mongoose.model("students"),Teacher=mongoose.model("teachers");router.get("/set/:id",function(e,s,o){FlashcardSet.findById(e.params.id).deepPopulate("flashcards").exec(function(e,o){e?s.json(e):s.json(o)})}),router.get("/sets/:userID",function(e,s,o){User.findById(e.params.userID).deepPopulate("flashcardSets flashcards").exec(function(e,o){e?s.json(e):s.json(o)})}),router.get("/teachersets/:userID",function(e,s,o){Teacher.findById(e.params.userID).deepPopulate("flashcardSets flashcards").exec(function(e,o){e?s.json(e):s.json(o)})}),router.post("/set",function(e,s,o){var t=new FlashcardSet({title:e.body.title});t.save(function(o,n){o&&(error=o);var a=t._id,r=t.title,d={$push:{flashcardSets:t}},i={"new":!0};User.findByIdAndUpdate(e.body.id,d,i).deepPopulate("flashcardSets flashcards").exec(function(e,o){e?s.json(e):s.json({user:o,setID:a,title:r})})})}),router.post("/teacherset",function(e,s,o){var t=new FlashcardSet({title:e.body.title});t.save(function(o,n){o&&(error=o);var a=t._id,r=t.title,d={$push:{flashcardSets:t}},i={"new":!0};Teacher.findByIdAndUpdate(e.body.id,d,i).deepPopulate("flashcardSets flashcards").exec(function(e,o){e?s.json(e):s.json({user:o,setID:a,title:r})})})}),router.put("/set/:id",function(e,s,o){var t={"new":!0},n={title:e.body.title};FlashcardSet.findByIdAndUpdate(e.params.id,n,t,function(e,o){e?s.json(e):s.json(o)})}),router["delete"]("/set/:id",function(e,s,o){FlashcardSet.findByIdAndRemove(e.params.id,function(e,o){e?s.json(e):s.json(o)})}),router.get("/card/:id",function(e,s,o){Flashcard.findById(e.params.id).deepPopulate().exec(function(e,o){e?s.json(e):s.json(o)})}),router.post("/card",function(e,s,o){var t=new Flashcard({question:e.body.question,answer:e.body.answer});t.save(function(o,n){if(n){var a={$push:{flashcards:t}},r={"new":!0};FlashcardSet.findByIdAndUpdate(e.body.setID,a,r).deepPopulate("flashcards").exec(function(e,o){e?s.json(e):s.json(o)})}})}),router.put("/card/:id",function(e,s,o){var t={"new":!0},n={question:e.body.question,answer:e.body.answer};Flashcard.findByIdAndUpdate(e.params.id,n,t,function(e,o){e?s.json(e):s.json(o)})}),router["delete"]("/card/:id",function(e,s,o){Flashcard.findByIdAndRemove(e.params.id,function(e,o){e?s.json(e):s.json(o)})}),module.exports=router;

// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var deepPopulate = require("mongoose-deep-populate")(mongoose);
// var FlashcardSet = mongoose.model('flashcardSets');
// var Flashcard = mongoose.model('flashcards');
// var User = mongoose.model('students');
// var Teacher = mongoose.model('teachers');


// //------------- FLASHCARD SET ROUTES ----------------//

// //get one set by id
// router.get('/set/:id', function(req, res, next) {
//   FlashcardSet.findById(req.params.id)
//     .deepPopulate('flashcards')
//     .exec(function(err, data){
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });

// //get all sets and cards from STUDENT
// router.get('/sets/:userID', function(req, res, next) {
//   User.findById(req.params.userID)
//   .deepPopulate('flashcardSets flashcards')
//     .exec(function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//     });
// });


// //get all sets and cards from TEACHER
// router.get('/teachersets/:userID', function(req, res, next) {
//   Teacher.findById(req.params.userID)
//   .deepPopulate('flashcardSets flashcards')
//     .exec(function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//     });
// });

// //post-add one set to STUDENT
// router.post('/set', function(req, res, next) {
//   var newSet = new FlashcardSet({title:req.body.title});
//   newSet.save(function(err, set){
//      if(err){
//       error = err;
//     }
//     var setID = newSet._id;
//     var title = newSet.title;
//     var update = {$push:{flashcardSets : newSet}};
//     var options = {new:true};
//     User.findByIdAndUpdate(req.body.id, update, options)
//     .deepPopulate('flashcardSets flashcards')
//     .exec(function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json({user:data, setID:setID, title:title});
//       }
//     });
//   });
// });

// //post-add one set to TEACHER
// router.post('/teacherset', function(req, res, next) {
//   var newSet = new FlashcardSet({title:req.body.title});
//   newSet.save(function(err, set){
//      if(err){
//       error = err;
//     }
//     var setID = newSet._id;
//     var title = newSet.title;
//     var update = {$push:{flashcardSets : newSet}};
//     var options = {new:true};
//     Teacher.findByIdAndUpdate(req.body.id, update, options)
//     .deepPopulate('flashcardSets flashcards')
//     .exec(function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json({user:data, setID:setID, title:title});
//       }
//     });
//   });
// });


// //PUT-update one set by id
// router.put('/set/:id', function(req, res, next) {
//   var options = {new:true};
//   var update = {title: req.body.title};
//   FlashcardSet.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });

// //delete set
// router.delete('/set/:id', function(req, res, next) {
//   FlashcardSet.findByIdAndRemove(req.params.id, function(err, data){
//      if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });


// //---------------- FLASHCARD ROUTES ----------------//

// //get one card by id
// router.get('/card/:id', function(req, res, next) {
//   Flashcard.findById(req.params.id)
//     .deepPopulate()
//     .exec(function(err, data){
//       if(err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//   });
// });

// //post-add one card to set
// router.post('/card', function(req, res, next) {
//   var newCard = new Flashcard({question:req.body.question, answer:req.body.answer});
//   newCard.save(function(err, card){
//     if(card){
//     var update = {$push:{flashcards : newCard}};
//     var options = {new:true};
//     FlashcardSet.findByIdAndUpdate(req.body.setID, update, options)
//     .deepPopulate('flashcards')
//     .exec(function(err, data){
//       if (err){
//         res.json(err);
//       }
//       else{
//         res.json(data);
//       }
//     });
//     }
//   });
// });


// //PUT-update one flashcard by id
// router.put('/card/:id', function(req, res, next) {
//   var options = {new:true};
//   var update = {question : req.body.question , answer: req.body.answer};
//   Flashcard.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//     if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });


// //delete Flashcard
// router.delete('/card/:id', function(req, res, next) {
//   Flashcard.findByIdAndRemove(req.params.id, function(err, data){
//      if(err){
//       res.json(err);
//     }
//     else{
//       res.json(data);
//     }
//   });
// });



// module.exports = router;
