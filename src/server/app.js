require('./models/teacher.js');
require('./models/student.js');

require('./models/vocabGameModels.js');


// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var server = require('http').Server(app);

// *** config file *** //
var config = require('../../_config');

// *** mongoose ** //
mongoose.connect(config.MONGO_URI);

// *** express instance *** //

// *** routes *** //
var routes = require('./routes/index.js');
var teacherRoutes = require('./routes/teacherRoutes.js');
var vocabGameRoutes = require('./routes/vocabGameRoutes.js');


var app = express();
// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));



// *** main routes *** //
app.use('/', routes);
app.use('/auth/', teacherRoutes);
app.use('/vocab/', vocabGameRoutes);



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
