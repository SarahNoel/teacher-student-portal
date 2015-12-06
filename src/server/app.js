require('./models/teacher.js');
require('./models/student.js');
require('./models/vocabGameModels.js');
require('./models/hangmanGameModel.js');
require('./models/flashcardModel.js');
require('./models/chatrooms.js');

// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');


var server = require('http').Server(app);

// *** config file *** //
var config = require('../../_config');


// *** express instance *** //

// *** routes *** //
var routes = require('./routes/index.js');
var teacherRoutes = require('./routes/teacherRoutes.js');
var studentRoutes = require('./routes/studentRoutes.js');
var vocabGameRoutes = require('./routes/vocabGameRoutes.js');
var hangmanGameRoutes = require('./routes/hangmanGameRoutes.js');
var flashcardRoutes = require('./routes/flashcardRoutes.js');
var chatRoutes = require('./routes/chatRoutes.js');
var socketRoutes = require('./socket.js');

var app = express();

/** attach socket.io to the app */
var io = require('socket.io')();
app.io = io;
require('./socket.js')(io);


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));



// *** main routes *** //
app.use('/', routes);
app.use('/auth/', teacherRoutes);
app.use('/studentUsers/', studentRoutes);
app.use('/chat/', chatRoutes);
app.use('/socket/', socketRoutes);

// *** mini-game routes *** //
app.use('/vocab/', vocabGameRoutes);
app.use('/hangman/', hangmanGameRoutes);
app.use('/flashcards/', flashcardRoutes);

// *** mongoose ** //
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

// *** error handlers *** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
