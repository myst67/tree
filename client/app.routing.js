"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/component/home.component");
var craetejob_component_1 = require("./home/component/craetejob.component");
var app_routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'createJob', component: craetejob_component_1.CraetejobComponent }
];
exports.app_routing = router_1.RouterModule.forRoot(app_routes);
//# sourceMappingURL=app.routing.js.map