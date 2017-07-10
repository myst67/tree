var db = require('../../backend/accessDB')
var util = require('util');

exports.register = function(req, res) {

   console.log('inside customer api ====');
   // console.log(req.body);
   var registationDetails = req.body;
   console.log(registationDetails);
  //  return;
   db.customerRegistrationDetails(registationDetails, function (err, regData){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:regData};
            res.json(response);
        }
    });
};

exports.login = function(req, res) {
   console.log('inside customer api ====');
   console.log(req.body);
   // return;
   // console.log(req.body);
   var loginDetails = req.body;
   db.customerLoginDetails(loginDetails, function (err, loginResponse){
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:loginResponse};
            res.json(response);
        }

        // console.log('after find logindata mongodb====');
       
    });

};

exports.accountdetails = function(req, res) {
   
   var token_id = req.get('customer_token');
   db.customerAccountDetails(token_id, function (err, accountInfo){
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:accountInfo};
            console.log('after getting mongo db========');
            console.log(accountInfo);
            res.json(response);
        }

        // console.log('after find logindata mongodb====');
       
    });

};

exports.saveDocument = function(req, res) {
   
   var uploadDetails = req.body;
   db.uploadDocument(uploadDetails, function (err, uploadRes){
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:uploadRes};
            res.json(response);
        }
    });

};

exports.haveDocument = function(req, res) {
   
   console.log('inside have dpocument api===');
   var token = req.get('customer_token');
   db.haveDocument(token, function (err, docRes){
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:docRes};
            res.json(response);
        }
    });

}