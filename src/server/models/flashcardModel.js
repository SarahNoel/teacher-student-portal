var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//defines set of Flashcards
var FlashcardSet = new Schema({
  title: String,
  flashcards:[{type: Schema.Types.ObjectId,
    ref:'flashcards'}]
});

var Flashcard = new Schema({
  question: String,
  answer: String
});


FlashcardSet.plugin(deepPopulate);
Flashcard.plugin(deepPopulate);

module.exports = mongoose.model('flashcards', Flashcard);
module.exports = mongoose.model('flashcardSets', FlashcardSet);
