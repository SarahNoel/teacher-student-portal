var mongoose = require('mongoose');
var deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

//define users
var Student = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false
  },
  vocabGamesPlayed: {
    type: Number,
    default: 0
  },
  vocabGamesWon: {
    type: Number,
    default: 0
  },
  vocabGamesLost: {
    type: Number,
    default: 0
  },
  teacherID:{
    type: String
  },
  disabledAlerts: {
    type: Boolean,
    default: false
  },
  flashcardSets: [{type: Schema.Types.ObjectId,
    ref:'flashcardSets'}],
  conversations: [{type: Schema.Types.ObjectId,
    ref:'conversations'}]
});

Student.plugin(deepPopulate);

module.exports = mongoose.model('students', Student);
