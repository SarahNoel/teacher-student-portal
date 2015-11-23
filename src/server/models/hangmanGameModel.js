var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//defines vocab games
var HangmanGame = new Schema({
  theme: {type: String, unique: true},
  words: [String]
});

module.exports = mongoose.model('hangmanGames', HangmanGame);

