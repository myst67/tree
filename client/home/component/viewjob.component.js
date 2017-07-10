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
var router_1 = require("@angular/router");
var createform_service_1 = require("../service/createform.service");
var router_2 = require("@angular/router");
var customer_service_1 = require("../service/customer.service");
var ViewjobComponent = (function () {
    function ViewjobComponent(_router, _route, _viewjobservice, _accountservice) {
        this._router = _router;
        this._route = _route;
        this._viewjobservice = _viewjobservice;
        this._accountservice = _accountservice;
    }
    ViewjobComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._route.snapshot.params['id']) {
            this.jobId = this._route.snapshot.params['id'];
        }
        else {
            this._router.navigate(['/']);
            return;
        }
        this.customer_token = localStorage.getItem('customer_token');
        this.subscription = this._viewjobservice.getJobDetails(this.jobId)
            .subscribe(function (response) {
            // console.log('Get customer data into dom===');
            // console.log(response);
            //response = response[0];
            console.log(response);
            if (response.success === true) {
                _this.label = response.msg[0].label;
                _this.company = response.msg[0].company;
                _this.description = response.msg[0].description;
                _this.location = response.msg[0].location;
                _this.recruiter_name = response.msg[0].recruiter_name;
                _this.recruiter_ph = response.msg[0].recruiter_ph;
                _this.craete_date = response.msg[0].craete_date;
            }
            else {
                _this.anyError = response.msg;
            }
        }, function (error) {
            _this.anyError = error;
        });
    };
    ViewjobComponent.prototype.applyJob = function () {
        if (!this.customer_token) {
            this.anyError = 'Please login before applying job';
        }
        else {
            this.isUserHaveDocument();
        }
    };
    ViewjobComponent.prototype.isUserHaveDocument = function () {
        // this.docRes = false;
        var _this = this;
        this.subscription = this._accountservice.haveDocument(this.customer_token)
            .subscribe(function (response) {
            // console.log('after applying===');
            // console.log(response);
            // return false;
            if (response.success === false) {
                _this.anyError = response.msg;
            }
            else {
                _this.subscription = _this._viewjobservice.applyJob(_this.jobId)
                    .subscribe(function (data) {
                    if (data.success === true) {
                        _this.jobRefId = data.msg;
                    }
                    else {
                        console.log(data.msg);
                        _this.anyError = data.msg;
                    }
                }, function (error) {
                    _this.anyError = error;
                });
            }
        }, function (error) {
            _this.anyError = error;
        });
    };
    return ViewjobComponent;
}());
ViewjobComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'viewjob-app',
        providers: [createform_service_1.CreateformService, customer_service_1.CustomerService],
        templateUrl: 'viewjob.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, createform_service_1.CreateformService, customer_service_1.CustomerService])
], ViewjobComponent);
exports.ViewjobComponent = ViewjobComponent;
//# sourceMappingURL=viewjob.component.js.map