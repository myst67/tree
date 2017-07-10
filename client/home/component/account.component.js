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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var customer_service_1 = require("../service/customer.service");
var ng2_file_upload_1 = require("ng2-file-upload");
var AccountComponent = (function () {
    function AccountComponent(fb, _router, _accountservice) {
        this.fb = fb;
        this._router = _router;
        this._accountservice = _accountservice;
        this.isCustomerLoggedin = false;
        this.buttonIsHide = 'false';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        var customer_token = localStorage.getItem('customer_token');
        if (!customer_token) {
            this._router.navigate(['/']);
            return;
        }
        this.subscription = this._accountservice.getCustomer(customer_token)
            .subscribe(function (response) {
            if (response.success === true) {
                _this.firstname = response.msg.firstname;
                _this.lastname = response.msg.lastname;
                _this.email = response.msg.email;
                _this.dob = response.msg.dob;
                _this.location = response.msg.location;
                _this.phone = response.msg.phone;
                _this.craete_date = response.msg.craete_date;
                _this.haveDocument(customer_token);
            }
            else {
                _this.anyError = response.msg;
            }
        }, function (error) {
            _this.anyError = error;
        });
    };
    AccountComponent.prototype.uploadFile = function (item) {
        var _this = this;
        item.upload();
        this.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            var actualResponse = JSON.parse(fileItem._xhr.response);
            if (status == 200 && actualResponse.success === true) {
                _this.token = localStorage.getItem('customer_token');
                _this.subscription = _this._accountservice.saveDocument(_this.token, actualResponse.msg)
                    .subscribe(function (response) {
                    if (response.success === true) {
                        _this.buttonIsHide = 'true';
                        _this.documentName = response.msg;
                        _this.docUrl = 'uploads/' + _this.documentName;
                        _this.anyError = '';
                        _this.noDocumentMsg = '';
                    }
                    else {
                        _this.anyError = response.msg;
                    }
                }, function (error) {
                    _this.anyError = error;
                });
            }
        };
    };
    AccountComponent.prototype.haveDocument = function (token) {
        var _this = this;
        this.subscription = this._accountservice.haveDocument(token).subscribe(function (response) {
            if (response.success === true) {
                _this.documentName = response.msg;
                _this.docUrl = 'uploads/' + _this.documentName;
            }
            else {
                _this.noDocumentMsg = 'you dont have and resume';
            }
        }, function (error) {
            _this.anyError = error;
        });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'account-app',
        providers: [customer_service_1.CustomerService],
        templateUrl: 'account.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, customer_service_1.CustomerService])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map