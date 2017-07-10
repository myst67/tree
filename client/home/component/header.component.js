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
var login_helper_1 = require("./guards/login.helper");
var customer_service_1 = require("../service/customer.service");
var router_1 = require("@angular/router");
// declare var $:JQueryStatic;
var HeaderComponent = (function () {
    function HeaderComponent(fb, _loginHelper, _router, _customerservice) {
        this.fb = fb;
        this._loginHelper = _loginHelper;
        this._router = _router;
        this._customerservice = _customerservice;
        this.logo = "https://www.recsite.com/images/jobsite_logo2.gif";
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.loginForm();
    };
    HeaderComponent.prototype.loginForm = function () {
        this.login = this.fb.group({
            "email": ["", forms_1.Validators.compose([forms_1.Validators.required, this.mailFormat])],
            'password': ["", forms_1.Validators.compose([forms_1.Validators.required])]
        });
    };
    HeaderComponent.prototype.mailFormat = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }
        return null;
    };
    HeaderComponent.prototype.submitLogin = function (loginForm) {
        var _this = this;
        if (loginForm.valid) {
            console.log('inside login conpoennt===');
            console.log(loginForm.value.email);
            // return;
            this.subscription = this._customerservice.login(loginForm.value)
                .subscribe(function (response) {
                console.log('res from loginnn api ==== ');
                console.log(response.success);
                if (response.success === true) {
                    console.log('inside response===');
                    localStorage.setItem('customer_token', response.msg);
                    alert('Thank you for login');
                    _this.customerId = localStorage.getItem('customer_token');
                    _this._router.navigate(['/account']);
                    _this.closeBtn.nativeElement.click();
                }
                else {
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
    HeaderComponent.prototype.logout = function () {
        alert('Logging out !!!');
        localStorage.removeItem('customer_token');
        this.customerId = null;
        this._router.navigate(['/']);
    };
    HeaderComponent.prototype.isLogggedIn = function () {
        return this._loginHelper.isLogggedIn();
    };
    return HeaderComponent;
}());
__decorate([
    core_1.ViewChild('closeBtn'),
    __metadata("design:type", core_1.ElementRef)
], HeaderComponent.prototype, "closeBtn", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'header-app',
        providers: [customer_service_1.CustomerService, login_helper_1.LoginHelper],
        templateUrl: 'header.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_helper_1.LoginHelper, router_1.Router, customer_service_1.CustomerService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map