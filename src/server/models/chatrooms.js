var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//define chat messages
var Conversation = new Schema({
  room: String,
  users: Array,
  messages: [{type: Schema.Types.ObjectId,
    ref:'chatMessages'}]
});





//define chat messages
var ChatMessage = new Schema({
  user: String,
  message: String
});

ChatMessage.plugin(deepPopulate);
Conversation.plugin(deepPopulate);

module.exports = mongoose.model('chatMessages', ChatMessage);
module.exports = mongoose.model('conversations', Conversation);
