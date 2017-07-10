var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerRegSchema = new Schema({
    id : {
      type : Number, required: true, unique: true
    },
    firstname : {
      type : String, required: true, trim: true
    },
    lastname : {
      type : String, required: true, trim: true
    },
    email : {
      type : String, required: true, trim: true, unique: true
    },
    dob : {
      type : String, required: true, trim: true
    },
    location: {
      type : String, required: true, trim: true
    },
    phone: {
      type : String, required: true, trim: true
    },
    password: {
      type : String, required: true, trim: true
    },
    craete_date: {
      type : String, required: true, trim: true
    }
});
module.exports = mongoose.model('customer', customerRegSchema);