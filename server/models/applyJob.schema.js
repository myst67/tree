var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var applyjobSchema = new Schema({
    id : {
      type : String, required: true, trim: true, unique: true
    },
    customer_id : {
      type : String, required: true, trim: true
    },
    job_id : {
      type : String, required: true, trim: true
    },
    craete_date: {
      type : String, required: true, trim: true
    }
});
module.exports = mongoose.model('applyjob', applyjobSchema);