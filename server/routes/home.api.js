var db = require('../../backend/accessDB');
var util = require('util');

exports.listjob = function (req, res) {

    // var jobDetails = {};
    // var success= true;

    // jobDetails.id = new Date().getTime().toString().substr(-8);
    // jobDetails.label = req.get('formLabel');
    // jobDetails.description = req.get('formDes');
    // jobDetails.company = req.get('formCompany');
    // jobDetails.location = req.get('formLocation');
    // jobDetails.recruiter_name = req.get('formRecruiterName');
    // jobDetails.recruiter_ph = req.get('formRecruiterPh');

    // console.log('curren timestamp=====');
    // console.log(new Date().getTime().toString().substr(-8));


    db.getJobList(null, function (err, jobList){
        if (err) {
           res.json('error to get joblist data ... '+err);
        }else{
            console.log('after get joblist from mongodb====');
            console.log(jobList);
            res.json(jobList);
        }

        
    });

    
};