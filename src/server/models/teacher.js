var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var config = require('../../../_config');
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//define users
var User = new Schema({
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false
  },
  keyword: {
    type: String,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref:'students'
  }],
  vocabGames: [{type: Schema.Types.ObjectId,
    ref:'vocabGames'}],
  hangmanGames: [{type: Schema.Types.ObjectId,
    ref:'hangmanGames'}]
});


// hash before saving to database
User.pre('save', function(next) {
  var user = this;

  // only hash if the password is new or modified
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // overwrite the plain-text password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// verify for plain-text and hashed passwords
User.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};



User.plugin(deepPopulate);
module.exports = mongoose.model('teachers', User);
