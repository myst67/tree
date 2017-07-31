
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConfig = require('./configLoader').databaseConfig,
    treeDetails = require('../server/models/objectDetails.schema'),
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;
var SALT_WORK_FACTOR = 10;  

function reuseFunction(treeData,currentNodeValue,groupedData)
{
    var highest = null;
    var result = {};
    var flagFindNode = false;
    var newObject = {};
    var returnObject = {};
    var maxDepth = 1;
    if(groupedData === false)
    {
        for (var i=treeData.length-1; i>=0; i--) 
        {
            tmpId = treeData[i].id;
            if (tmpId > highest) highest = tmpId;

            if(treeData[i].value == currentNodeValue && flagFindNode===false)
            {
                flagFindNode = true;
                updateObject = {'value':currentNodeValue, 'depth':treeData[i].depth, 'id':highest+1};
                treeData.push(updateObject);
            }else if(treeData[i].id == currentNodeValue && flagFindNode===false)
            {
                flagFindNode = true;
                updateObject = {'value':currentNodeValue, 'depth':treeData[i].depth+1, 'id':highest+1};
                treeData.push(updateObject);
            }

        }
    }else{

        for(var i=0;i<treeData.length;i++)
        {
            if(!newObject[treeData[i]['depth']])
            {
                newObject[treeData[i]['depth']] = [];
            }

            if(treeData[i]['depth'] > maxDepth)
            {
                maxDepth ++;
            } 

            newObject[treeData[i]['depth']].push(treeData[i]);
        }
    }
    

    if(currentNodeValue > highest)
    {
        returnObject = {"redirect":true};
    }else if(groupedData === false){
        returnObject = {"redirect":false,"newTreeData":treeData};
    }else{
        returnObject = {"maxdepth":maxDepth,"newTreeData":newObject};
    }
    
    return returnObject;
};

module.exports = {
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

    close: function() {
        connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },

    insertObjectData: function(objectDetails, callback) {

       var treeName = objectDetails.treename;
       delete objectDetails.treename;

        objectDetailsSchema = new treeDetails({
            treeId: new Date().getTime().toString().substr(-8),
            treeName : treeName,
            data : objectDetails.items
        });

        objectDetailsSchema.save(function(err,data) {
            if (err) {
                callback(err, null);
            } else{
                callback(null, data.treeId);
            }
        });
    },

     updateObjectData: function(updateObjectDetails, callback) {

        treeDetails.findOne({'treeId': updateObjectDetails.id}, {}, function(err, tree) {
            if (err) {
                console.log("Error getting object details: " + err);
            } else {
                
                var result = reuseFunction(tree.data,updateObjectDetails.value,groupedData = false);
                if(result.redirect === true)
                {
                    err = "input value should not be greater then id !!";
                    callback(err, null);
                }else{
                    var newTreeData = result.newTreeData;

                    treeDetails.findOne({treeId: updateObjectDetails.id}, function (err, tree_data) {
                        
                        tree_data.treeId = updateObjectDetails.id;
                        tree_data.treeName  = tree.treeName;
                        tree_data.data = newTreeData;

                        tree_data.save(function (err) {
                            if(err) {
                                callback(err, null);
                            }else{
                                var newResult = reuseFunction(tree.data=newTreeData,updateObjectDetails.value=false,groupedData = true);
                                callback(null, newResult);
                            }
                        });
                    });
                }
            }
        });
    }
}
