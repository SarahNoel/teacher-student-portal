var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

//defines set of Resource
var Resource = new Schema({
  title: String,
  url: String,
  description: String
});

Resource.plugin(deepPopulate);

module.exports = mongoose.model('resources', Resource);
