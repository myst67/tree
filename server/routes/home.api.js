var db = require('../../backend/accessDB');

exports.craeteTree = function (req, res) {

    var objectDetails = req.body;
    var insertObjectDetails = {'id':objectDetails[0].items[0].id,'depth':objectDetails[0].depth,'treename':objectDetails[0].treename,'value':objectDetails[0].items[0].value}
    db.insertObjectData(insertObjectDetails, function (err, treeId){
        
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

    var objectValue = req.get('value');
    var treeId = req.get('treeId');
    var updateObjectDetails = {treeid: treeId,value:objectValue};
    
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