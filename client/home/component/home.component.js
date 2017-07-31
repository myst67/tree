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
var HomeComponent = (function () {
    function HomeComponent(_homeservice) {
        this._homeservice = _homeservice;
        this.treenamea = '';
        this.currentnodeValue = 0;
        this.currentObject = { "items": [{ "id": 1, "value": 0, "depth": 1 }] };
    }
    HomeComponent.prototype.createTree = function (treename) {
        var _this = this;
        this.treenamea = treename;
        if (this.treenamea) {
            this.currentObject['treename'] = this.treenamea;
            this._homeservice.getHomeContent(this.currentObject).subscribe(function (response) {
                if (response.success === true) {
                    _this.isDisabled = true;
                    _this.currentObject['treeId'] = response.msg;
                    _this.treeId = response.msg;
                }
                else {
                    alert(response.error);
                }
            });
        }
    };
    HomeComponent.prototype.addNode = function (value) {
        var _this = this;
        this.currentnodeValue = value;
        if (this.currentnodeValue && this.currentObject) {
            this.passObject = { "id": this.treeId, "value": this.currentnodeValue };
            this._homeservice.updateHomeContent(this.passObject).subscribe(function (response) {
                if (response.success === true) {
                    _this.updatedObject = response.msg.newTreeData;
                    _this.maxDepthArray = new Array(response.msg.maxdepth);
                    for (var i = 1; i <= response.msg.maxdepth; i++) {
                        for (var j = 0; j < _this.updatedObject[i].length; j++) {
                            _this.updatedObject[i].width = 100 / _this.updatedObject[i].length;
                        }
                    }
                }
                else {
                    alert(response.msg);
                    console.log(response.msg);
                }
            });
        }
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