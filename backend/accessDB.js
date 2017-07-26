
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConfig = require('./configLoader').databaseConfig,
    treeDetails = require('../server/models/objectDetails.schema'),
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;
var SALT_WORK_FACTOR = 10;  

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

    insertObjectData: function(insertObjectDetails, callback) {

        var treeName = insertObjectDetails.treename;
        delete insertObjectDetails.treename;
        objectDetailsSchema = new treeDetails({
            treeId: new Date().getTime().toString().substr(-8),
            treeName : treeName,
            data : insertObjectDetails
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

        treeDetails.find({'treeId': updateObjectDetails.treeid}, {}, function(err, tree) {
            if (err) {
                console.log("Error getting cms: " + err);
            } else {
                
                var treeNamea = tree[0].treeName;
                var updateObject = Object;
                var treeData = tree[0].data;
                var highest = null;
                var tmpId;
                var tmpValue;
                var updatedId;
                var updatedValue;
                var updatedDepth;
                var hash = {};
                var maxDepth = 0;

                for (var i=treeData.length-1; i>=0; i--) {
                    tmpId = treeData[i].id;
                    if (tmpId > highest) highest = tmpId;
                }

                if(updateObjectDetails.value > highest)
                {
                    err = "input value should not be greater then id !!";
                    callback(err, null);
                }else{
                    
                    for(var i=0;i<treeData.length;i++)
                    {
                        if(treeData[i].value == updateObjectDetails.value)
                        {
                            updatedId = highest+1;
                            updatedValue = updateObjectDetails.value;
                            updatedDepth = treeData[i].depth;
                            updateObject = {'value':updatedValue, 'depth':updatedDepth, 'id':updatedId,};
                            treeData.push(updateObject);
                            break;
                        }

                        if(treeData[i].id == updateObjectDetails.value){
                            updatedId = highest+1;
                            updatedValue = updateObjectDetails.value;
                            updatedDepth = treeData[i].depth+1;
                            updateObject = {'value':updatedValue, 'depth':updatedDepth, 'id':updatedId,};
                            treeData.push(updateObject);
                            break;
                        }
                    }

                    

                    
                    for(var j=0;j<treeData.length;j++)
                    {
                        if(!hash[treeData[j]['depth']])
                        {
                            hash[treeData[j]['depth']] = [];
                        }

                        if(treeData[j]['depth'] > maxDepth)
                        {
                            maxDepth ++;
                        } 

                        hash[treeData[j]['depth']].push(treeData[j]);
                    }

                    objectDetailsSchema = new treeDetails({
                        treeId: updateObjectDetails.treeid,
                        treeName : treeNamea,
                        data : hash
                    });

                    var finalData = {"maxDepth":maxDepth,"updatedNodeData":objectDetailsSchema};

                    treeDetails.findOne({treeId: updateObjectDetails.treeid}, function (err, tree_data) {
                        tree_data.treeId = updateObjectDetails.treeid;
                        tree_data.treeName  = treeNamea;
                        tree_data.data = treeData;

                        tree_data.save(function (err) {
                            if(err) {
                                callback(err, null);
                            }else{
                                callback(null, finalData);
                            }
                        });
                    });
                }
            }
        });
    }
}
