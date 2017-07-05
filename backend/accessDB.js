// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConfig = require('./configLoader').databaseConfig,
    jobdetails = require('../server/models/jobdetails.schema'),
   //getJobList = require('../server/models/joblist.schema'),
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

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

/*
    // insert Category
    insertCategory: function(req_body, callback) {
        // Inserting Category
        req_body[0]['filters'] = req_body[0].filterAttributes;
        var category = new Category({
            entityId: req_body[0].categoryId, name: req_body[0].name,
            isActive: req_body[0].isactive, image: req_body[0].image,
            include_in_menu: req_body[0].inmenu, description: req_body[0].description,
            displayMode: req_body[0].displayMode, identifier: req_body[0].identifier,
			filters: req_body[0].filterAttributes,
        });
        category.save(function(err) {
            if (err) {
                console.log('Error while saving Category: ' + err);
            } else {
                console.log('Category Saved Successfully !');
                // Inserting CMS block of Category
                if (req_body[0].identifier) {
                    Cms.find({'cmsid': req_body[0].identifier}, function(err, result) {
                        if (result.length == 0) {
                            var cms = new Cms({
                                cmsid: req_body[0].identifier,
                                content: req_body[0].content,
                                images: req_body[0].images
                            });
                            cms.save(function(err) {
                                if (err) {
                                    console.log("Error inserting cms while inserting category: " + err);
                                } else {
                                    callback(null, req_body);
                                }
                            });
                        }
                    });
                } else {
                    console.log("CMS Not available ! ");
                    callback(null, req_body);
                }
            }
        });
    },
    

    getCategory: function(id, callback) {
        Category.find({'entityId': id}, function(err, categoryDetails) {
            if (err) {
                console.log("Error in getCategory() " + err);
                callback(null, err);
            } else if (categoryDetails.length != 0) {
                Cms.find({'cmsid': categoryDetails[0].identifier}, function(err, result) {
                    if (err) {
                        console.log("Error getting cms: " + err);
                    } else {
                        if (result.length != 0) {
                            var response = {'displayMode':categoryDetails[0].displayMode, 'content': result[0].content};
                            callback(null, response);
                        } else {
                            var response = [categoryDetails[0].displayMode, categoryDetails[0].filters];
                            callback(null, categoryDetails);
                        }
                    }
                });
            } else {
                callback(null, categoryDetails);
                console.log('getCategory() executed Successfully.. But No data found');
            }
        });
    },

    // insert a  Customer
    insertCustomer: function(req_body, callback) {
        var customer = new Customer({
            id: req_body.id, firstname: req_body.firstname,
            lastname: req_body.lastname, email: req_body.email,
            customertoken: req_body.customertoken//,
           // quoteid:req_body.quoteid
        });
        customer.save(function(err) {
            if (err) {
                console.log('Error while saving customer: ' + err);
            }
        });
    },

    // get customer by token
    getCustomerByToken: function(customertoken, callback) {
        Customer.find({'customertoken': customertoken}, function(err, customer) {
            if (err) {
                console.log("Error Fething Customer: " + err);
            } else {
                callback(null, customer[0]);
            }
        });
    },

    // delete customer token
    deleteCustomerToken: function(customertoken, callback) {
        Customer.remove({'customertoken': customertoken}, function(err, customer) {callback(null);});
    },

    // insert a  Product
    insertProduct: function(product, callback) {
        Product.find({'sku': product.sku}, function(err, doc) {
            if (doc.length !=0) {
                Product.remove({'sku': product.sku}, function(err){
                    product.save(function(err) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        }
                        callback(null);
                    });
                });
            }
            product.save(function(err) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                callback(null);
            });
        });
    },

*/

    insertJobDetails: function(jobData, callback) {

        var datetime = new Date().toLocaleDateString();
       
        console.log('beofre delare scghema ==== ');
        jobdetailsSchema = new jobdetails({
            id: jobData.id, 
            label: jobData.label,
            description: jobData.description, 
            company: jobData.company,
            location: jobData.location,
            recruiter_name : jobData.recruiter_name,
            recruiter_ph: jobData.recruiter_ph,
            craete_date: datetime
        });
        jobdetailsSchema.save(function(err,data) {
            if (err) {
                console.log('Error while saving jobdetailsSchema: ' + err);
            } else{
                console.log('after save inmongo==');
                console.log(data);
            }
        });
        callback(null, jobdetailsSchema.id);
    },

    
    getJobList: function(err, callback) {
        jobdetails.find({},function(err, jobData) {
            if (err) {
                console.log("Error fething Menu: " + err);
            } else {
                callback(null, jobData);
                // console.log("inside mongo db ===");
                // console.log(jobData);
            }

        });
    },


}
