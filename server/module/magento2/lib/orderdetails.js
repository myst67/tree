var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }

// Custom API

    module.getorderDetails = function (id) {
        var endpointUrl = util.format('/orders?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=%s', id);
        return restClient.get(endpointUrl);
    }  

    return module;
}
