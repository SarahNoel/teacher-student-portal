var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//defines vocab games
var FlashcardSet = new Schema({
  title: {type: String, unique: true},
  words: Object
});

FlashcardSet.plugin(deepPopulate);

module.exports = mongoose.model('flashcardSets', FlashcardSet);
