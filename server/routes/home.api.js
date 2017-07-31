var db = require('../../backend/accessDB');

exports.craeteTree = function (req, res) {

    var objectDetails = req.body;

    // console.log('inside home api======');
    // console.log(objectDetails);
   // return false;

   //  var insertObjectDetails = {'id':objectDetails[0].items[0].id,'depth':objectDetails[0].depth,'treename':objectDetails[0].treename,'value':objectDetails[0].items[0].value}
    db.insertObjectData(objectDetails, function (err, treeId){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:treeId};
            res.json(response);
        }
    });
    
};
exports.updateTree = function (req, res) {

    var updateObjectDetails = req.body;
   
    db.updateObjectData(updateObjectDetails, function (err, treeData){
        
        var response = Object;
        if (err) {
            response = {success:false,msg:err}
            res.json(response);
        }else{
            response = {success:true,msg:treeData};
            res.json(response);
        }
    });
};