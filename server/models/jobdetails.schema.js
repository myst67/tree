var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobdetailsSchema = new Schema({
    id : {
      type : Number, required: true, unique: true
    },
    label : {
      type : String, required: true, trim: true
    },
    description : {
      type : String, required: true, trim: true
    },
    company : {
      type : String, required: true, trim: true
    },
    location : {
      type : String, required: true, trim: true
    },
    recruiter_name: {
      type : String, required: true, trim: true
    },
    recruiter_ph: {
      type : String, required: true, trim: true
    },
    craete_date: {
      type : String, required: true, trim: true
    }
});
module.exports = mongoose.model('jobdetails', jobdetailsSchema);
