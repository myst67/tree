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
// const URL = ;
var RegistrationComponent = (function () {
    function RegistrationComponent(fb, _router, _customerservice) {
        this.fb = fb;
        this._router = _router;
        this._customerservice = _customerservice;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.registrationForm();
    };
    RegistrationComponent.prototype.registrationForm = function () {
        this.registration = this.fb.group({
            "firstname": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "lastname": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "email": ["", forms_1.Validators.compose([forms_1.Validators.required, this.mailFormat])],
            "dob": ["", forms_1.Validators.compose([forms_1.Validators.required, this.dobFormat])],
            "location": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "phone": ["", forms_1.Validators.compose([forms_1.Validators.required, this.phoneFormat])],
            'passwords': this.fb.group({
                password: ['', forms_1.Validators.required],
                confirmpassword: ['', forms_1.Validators.required]
            }, { validator: this.specialValidator })
        });
    };
    RegistrationComponent.prototype.submitRegistration = function (registrationForm) {
        var _this = this;
        if (registrationForm.valid) {
            this.subscription = this._customerservice.register(registrationForm.value)
                .subscribe(function (response) {
                if (response.success === true) {
                    localStorage.setItem('customer_token', response.msg);
                    alert('Thank you for Registration');
                    _this._router.navigate(['/account']);
                }
                else {
                    console.log(response.msg);
                    _this.anyError = response.msg;
                }
            }, function (error) {
                _this.anyError = error;
                console.error(error);
            });
        }
        else {
            this.msg = "Form Is Not Valid";
        }
        // this.createJobForm();
    };
    RegistrationComponent.prototype.specialValidator = function (g) {
        return g.get('password').value != '' && g.get('password').value != g.get('confirmpassword').value ? { 'incorrectPassword': true } : null;
    };
    RegistrationComponent.prototype.dobFormat = function (control) {
        var DOB_REGEXP = /([012]?[1-9]|[12]0|3[01])\/(0?[1-9]|1[012])\/([0-9]{4})/;
        if (control.value != "" && (!DOB_REGEXP.test(control.value))) {
            return { "incorrectDateFormat": true };
        }
        return null;
    };
    RegistrationComponent.prototype.mailFormat = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }
        return null;
    };
    RegistrationComponent.prototype.phoneFormat = function (control) {
        var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
            return { "incorrectPhoneFormat": true };
        }
        return null;
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'registration-app',
        providers: [customer_service_1.CustomerService],
        templateUrl: 'registration.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, customer_service_1.CustomerService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map