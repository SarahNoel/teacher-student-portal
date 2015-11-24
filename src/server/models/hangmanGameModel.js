var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//defines vocab games
var HangmanGame = new Schema({
  title: {type: String, unique: true},
  words: [String]
});

HangmanGame.plugin(deepPopulate);
module.exports = mongoose.model('hangmanGames', HangmanGame);

