var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectDetailsSchema = new Schema({
    treeId : {
      type : Number, required: true,unique: true
    },
    treeName : {
      type : String, required: true, trim: true
    },
    data : {
      type : Array, required: true, trim: true
    }
});
module.exports = mongoose.model('treeDetails', objectDetailsSchema);
