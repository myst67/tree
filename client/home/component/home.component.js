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
var home_service_1 = require("../service/home.service");
// declare var $:JQueryStatic;
var HomeComponent = (function () {
    function HomeComponent(_homeservice) {
        this._homeservice = _homeservice;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._homeservice.getHomeContent()
            .subscribe(function (response) {
            _this.joblist = response.msg;
            if (_this.joblist.length < 1) {
                _this.emptyJobList = true;
            }
            else {
                _this.emptyJobList = false;
            }
        });
    };
    HomeComponent.prototype.cutString = function (str) {
        length = 50;
        str = str.length > length ? str.substring(0, length - 3) + "..." : str;
        return str;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home-app',
        providers: [home_service_1.HomeService],
        templateUrl: 'home.component.html'
    }),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map