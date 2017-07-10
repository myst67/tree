"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CustomerService = (function () {
    function CustomerService(_http) {
        this._http = _http;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    CustomerService.prototype.saveJob = function (createjobForm) {
        console.log('inside service');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('formLabel', createjobForm.label);
        headers.append('formDes', createjobForm.job_description);
        headers.append('formCompany', createjobForm.company);
        headers.append('formLocation', createjobForm.location);
        headers.append('formRecruiterName', createjobForm.recruiter_name);
        headers.append('formRecruiterPh', createjobForm.recruiter_ph);
        return this._http.get('api/dataservice/createjob', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.saveDocument = function (token, filename) {
        console.log('inside service');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        headers.append('filename', filename);
        return this._http.post('api/dataservice/saveDocument', JSON.stringify({ token: token, filename: filename }), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.register = function (registerFormValues) {
        // console.log(JSON.stringify(customerCredentials));
        console.log('reg form value data ==== ');
        console.log(registerFormValues);
        // return;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('api/dataservice/register', JSON.stringify(registerFormValues), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.login = function (loginFormValues) {
        // console.log(JSON.stringify(customerCredentials));
        var headers = new http_1.Headers();
        // var loginFormValues = {username:username,password:password}
        headers.append('Content-Type', 'application/json');
        return this._http.post('api/dataservice/login', JSON.stringify(loginFormValues), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.getCustomer = function (customer_toekn) {
        // console.log('inside customer service===');
        // console.log(customer_toekn);
        // return;
        var headers = new http_1.Headers();
        // var loginFormValues = {username:username,password:password}
        headers.append('Content-Type', 'application/json');
        headers.append('customer_token', customer_toekn);
        return this._http.get('api/dataservice/customerDetails', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.haveDocument = function (customer_toekn) {
        // console.log('inside account service=====');
        // console.log(customer_toekn);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customer_token', customer_toekn);
        return this._http.get('api/dataservice/haveDocument', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map