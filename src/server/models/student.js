var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var config = require('../../../_config');

//define users
var Student = new Schema({
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
  }
});


// hash before saving to database
Student.pre('save', function(next) {
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
Student.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('students', Student);
