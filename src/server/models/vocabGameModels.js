var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//defines vocab games
var VocabGame = new Schema({
  title: {type: String, unique: true},
  questions: [{type: Schema.Types.ObjectId, ref:'vocabQuestions'}]
});

var VocabQuestion = new Schema({
  question: String,
  answer: String
});


VocabGame.plugin(deepPopulate);
VocabQuestion.plugin(deepPopulate);

module.exports = mongoose.model('vocabGames', VocabGame);
module.exports = mongoose.model('vocabQuestions', VocabQuestion);

