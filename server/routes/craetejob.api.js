var db = require('../../backend/accessDB');
var util = require('util');

exports.craetejob = function (req, res) {

    var jobDetails = {};
    var success= true;

    jobDetails = req.body;    
    db.insertJobDetails(jobDetails, function (err, jd){
       
       if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:jd};
            res.json(response);
        }
    });

    
};

exports.getJob = function (req, res) {

    var jobDa = {};
    var success= true;
    var jobid = req.get('jobId');
    
    db.getJob(jobid, function (err, jd){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:jd};
            res.json(response);
        }
    });
}

exports.applyJob = function (req, res) {

    var jobid = req.body.jobId;
    var token = req.body.token;
    var jobDetails = {jobid:jobid,token:token};
   
    db.applyJob(jobDetails, function (err, jd){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:jd};
            res.json(response);
        }
    });

    
};