var db = require('../../backend/accessDB');
var util = require('util');

exports.listjob = function (req, res) {
    db.getJobList(null, function (err, jobList){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:jobList};
            res.json(response);
        }

    });

    
};