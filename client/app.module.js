"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var home_component_1 = require("./home/component/home.component");
var header_component_1 = require("./home/component/header.component");
var craetejob_component_1 = require("./home/component/craetejob.component");
var registration_component_1 = require("./home/component/registration.component");
var account_component_1 = require("./home/component/account.component");
var viewjob_component_1 = require("./home/component/viewjob.component");
var ng2_file_upload_1 = require("ng2-file-upload");
var auth_guard_1 = require("./home/component/guards/auth.guard");
var app_modules = [
    platform_browser_1.BrowserModule,
    forms_1.FormsModule,
    forms_1.ReactiveFormsModule,
    http_1.HttpModule,
    ng2_file_upload_1.FileUploadModule,
    app_routing_1.app_routing
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: app_modules.slice(),
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            craetejob_component_1.CraetejobComponent,
            header_component_1.HeaderComponent,
            registration_component_1.RegistrationComponent,
            account_component_1.AccountComponent,
            viewjob_component_1.ViewjobComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map