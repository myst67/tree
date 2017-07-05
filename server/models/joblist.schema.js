var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var joblist = new Schema({
     joblist: {
         type : Array, required : false,
         },
});
module.exports = mongoose.model('jobdetails', joblist);
