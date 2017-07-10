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
var createform_service_1 = require("../service/createform.service");
var CraetejobComponent = (function () {
    function CraetejobComponent(fb, _createformservice) {
        this.fb = fb;
        this._createformservice = _createformservice;
    }
    CraetejobComponent.prototype.ngOnInit = function () {
        this.createJobForm();
    };
    CraetejobComponent.prototype.createJobForm = function () {
        this.createjob = this.fb.group({
            "label": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "job_description": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "company": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "recruiter_name": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "location": ["", forms_1.Validators.compose([forms_1.Validators.required])],
            "recruiter_ph": ["", forms_1.Validators.compose([forms_1.Validators.required, this.phoneFormat])]
        });
    };
    CraetejobComponent.prototype.phoneFormat = function (control) {
        var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
            return { "incorrectPhoneFormat": true };
        }
        return null;
    };
    CraetejobComponent.prototype.submitJobForm = function (createjobForm) {
        var _this = this;
        if (createjobForm.valid) {
            // console.log(createjobForm.value);
            // return false;
            this.subscription = this._createformservice.saveJob(createjobForm.value)
                .subscribe(function (response) {
                if (response.success === true) {
                    _this.msg = 'Thank you for craeting Job. Your Job id is:' + response.msg;
                }
                else {
                    _this.anyError = response.msg;
                }
            });
        }
        else {
            this.anyError = "Form Is Not Valid";
        }
        this.createJobForm();
    };
    return CraetejobComponent;
}());
CraetejobComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'createjob-app',
        providers: [createform_service_1.CreateformService],
        templateUrl: 'craetejob.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, createform_service_1.CreateformService])
], CraetejobComponent);
exports.CraetejobComponent = CraetejobComponent;
//# sourceMappingURL=craetejob.component.js.map