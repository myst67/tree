var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uploadDocumentSchema = new Schema({
    customer_id : {
      type : String, required: true, trim: true
    },
    filename : {
      type : String, required: true, trim: true
    },
    craete_date: {
      type : String, required: true, trim: true
    }
});
module.exports = mongoose.model('upload', uploadDocumentSchema);