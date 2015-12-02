var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//define chat messages
var ChatMessage = new Schema({
  user: String,
  message: String
});

ChatMessage.plugin(deepPopulate);

module.exports = mongoose.model('chatMessages', ChatMessage);
