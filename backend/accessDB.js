// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    filesystem = require('fs'),
    Schema = mongoose.Schema,
    dbConfig = require('./configLoader').databaseConfig,
    bcrypt = require('bcrypt'),
    jobdetails = require('../server/models/jobdetails.schema'),
    customerReg = require('../server/models/customerRegistration.schema'),
    uploadDocument = require('../server/models/uploadDocument.schema'),
    applyJob = require('../server/models/applyJob.schema'),
    // customerLogin = require('../server/models/customerLogin.schema'),
   //getJobList = require('../server/models/joblist.schema'),
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;
var SALT_WORK_FACTOR = 10;  

// connect to database
module.exports = {
    // initialize DB
    startup: function(callback) {
        if (!mongoose.connection.readyState) {
            mongoose.connect(connectionString);
            connection = mongoose.connection;
            mongoose.Promise = global.Promise;
            mongoose.connection.on('open', function() {
                console.log('We have connected to mongodb');
            });
        }
    },

    // disconnect from database
    close: function() {
        connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },

    insertJobDetails: function(jobData, callback) {

        var datetime = new Date().toLocaleDateString();
       
        console.log('beofre delare scghema ==== ');
        console.log(jobData);

        jobdetailsSchema = new jobdetails({
            id: new Date().getTime().toString().substr(-8), 
            label: jobData.label,
            description: jobData.job_description, 
            company: jobData.company,
            location: jobData.location,
            recruiter_name : jobData.recruiter_name,
            recruiter_ph: jobData.recruiter_ph,
            craete_date: datetime
        });
        jobdetailsSchema.save(function(err,data) {
            if (err) {
                 callback(err, null);
            } else{
                console.log('else fn=====');
                console.log(data);

                callback(null, data.id);
            }
        });
    },

    applyJob: function(jobDetails, callback) {

        var datetime = new Date().toLocaleDateString();
        var err = '';
        console.log('beofre delare scghema ==== ');


        applyJob.find({customer_id: jobDetails.token},function(err, jobData) {
            if (err) {
                console.log("Error fetching job details by customer: " + err);
                callback(null, jobData);
            } else {

                console.log('old job data====');
                console.log(jobData);
                console.log('new job data====');
                console.log(jobDetails.jobid);
                
                for(var i=0;i<jobData.length;i++)
                {
                    if(jobData[i].job_id == jobDetails.jobid)
                    {
                         err = 'You already apply for this job before..';
                         callback(err, null);
                         return;
                    }
                }

                applyJobSchema = new applyJob({
                    id: new Date().getTime().toString(), 
                    customer_id: jobDetails.token,
                    job_id: jobDetails.jobid, 
                    craete_date: datetime
                });
                applyJobSchema.save(function(err,data) {
                    if (err) {
                        console.log('Error while saving jobdetailsSchema: ' + err);
                        callback(err, null);
                    } else{
                        callback(err, applyJobSchema.id);
                    }
                });
            }

        });

        
        
    },

    uploadDocument: function(docData, callback) {

        var datetime = new Date().toLocaleDateString();
        uploadDocumentSchema = new uploadDocument({
            customer_id: docData.token, 
            filename: docData.filename,
            craete_date: datetime
        });

        uploadDocument.findOne({customer_id: docData.token},function(err,docDbData) {
            if(docDbData == null)
            {
                uploadDocumentSchema.save(function(err,data) {
                    if (err) {
                        callback(err, null);
                    } else{
                        callback(null, data.filename);
                    }
                });
            }else{
                var filePath = 'uploads/'+docDbData.filename; 
                filesystem.unlinkSync(filePath);

                docDbData.filename = docData.filename;
                docDbData.craete_date = datetime;
                docDbData.save();

                callback(null, docData.filename);
            }
        });
    },


    haveDocument: function(token, callback) {
        uploadDocument.findOne({customer_id: token},function(err,docDbData) {
            var err = '';
            if(docDbData == null)
            {
                err = 'user dosenot have any document, please upload your resume before applying!!';
                callback(err, null);
            }else{
                callback(null, docDbData.filename);
            }
        });
    },


    customerRegistrationDetails: function(registrationData, callback) {

        console.log('inside mongo db regData ====');
       console.log(registrationData);
      // return;
       // callback(null, null);
        
        var datetime = new Date().toLocaleDateString();
        var error = String;
        console.log('beofre delare scghema ==== ');
        customerSchema = new customerReg({
            id:new Date().getTime().toString(),
            firstname: registrationData.firstname,
            lastname: registrationData.lastname, 
            email: registrationData.email, 
            dob: registrationData.dob, 
            location: registrationData.location,
            phone : registrationData.phone,
            password: registrationData.passwords.password,
            craete_date: datetime
        });
        /* customerSchema.save(function(err,data) {
            if (err) {
                console.log('Error while saving jobdetailsSchema: ' + err);
            } else{
                console.log('after save inmongo==');
                console.log(data);
            }
        });
        callback(null, customerSchema.id);
        */
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) 
            {
                console.log('error 1===' + err);
                callback(err, null);
            }else{
                bcrypt.hash(customerSchema.password, salt, function (err, hash) {
                    if (err) {
                        callback(err, null);
                    }else{
                        this.customerSchema.password = hash;
                        customerSchema.save(function(err,next) {
                            if (err){
                                console.log('Error while saving jobdetailsSchema: ' + err); throw err; 
                                callback(err, null);
                            }else{
                                callback(null, customerSchema.id);
                            }
                        });
                    }
                });
            }
        });
        
         
    },

    customerLoginDetails: function(loginData, callback) {
        var error = '';
        var response = '11';
        customerReg.findOne({email: loginData.email},function(err, loginDbData) {
            if(loginDbData == null)
            {
                err = 'cutomer email not exist in db';
                callback(err,null);
            }else{
                var saltPassword = loginDbData.password;
                bcrypt.compare(loginData.password, saltPassword, function(err, res) 
                {
                    if (err) {
                        console.log('Error while fetching compare password: ' + err); throw err; 
                        callback(err,null);
                    }
                    if(res===true)
                    {
                        callback(null,loginDbData.id);
                    }else{
                        err = 'password id not matchinig!';
                        callback(err,null);
                    }
                    
                });
            }
        });
    },

    getJobList: function(err, callback) {
        jobdetails.find({},function(err, jobData) {
            if (err) {
                console.log("Error fething Menu: " + err);
                callback(err,null);
            } else {
                callback(null, jobData);
            }

        });
    },

    getJob: function(jobid, callback) {
        console.log('inside access db====');
        console.log(jobid);

        jobdetails.find({id: jobid},function(err, jobData) {
            if (err) {
                console.log("Error fething Menu: " + err);
                callback(err,null);
            } else {
                callback(null, jobData);
            }

        });
    },


    customerAccountDetails: function(token_id, callback) {
        customerReg.findOne({id: token_id},function(err, accountData) {
            if(accountData == null)
            {
                err = 'Cannot find account from customer id';
                callback(err,null);
            }else{
                console.log('inside accessdb ====');
                console.log(accountData);
                var accountInfo = {
                    firstname: accountData.firstname,
                    lastname: accountData.lastname,
                    email: accountData.email,
                    dob: accountData.dob,
                    location: accountData.location,
                    phone: accountData.phone,
                    craete_date: accountData.craete_date
                }
                callback(null,accountInfo);
            }
        });
    },


}
