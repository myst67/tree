var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.getHeaderData = function () {
        return restClient.get('/header');
    }

 return module;
 
}
