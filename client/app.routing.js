"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/component/home.component");
var craetejob_component_1 = require("./home/component/craetejob.component");
var registration_component_1 = require("./home/component/registration.component");
var account_component_1 = require("./home/component/account.component");
var viewjob_component_1 = require("./home/component/viewjob.component");
var app_routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'createJob', component: craetejob_component_1.CraetejobComponent },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: 'account', component: account_component_1.AccountComponent },
    { path: 'viewjob/id/:id', component: viewjob_component_1.ViewjobComponent }
];
exports.app_routing = router_1.RouterModule.forRoot(app_routes);
//# sourceMappingURL=app.routing.js.map