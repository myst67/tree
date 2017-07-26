"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/component/home.component");
// import { CraetejobComponent }     from './home/component/craetejob.component';
// import { RegistrationComponent }     from './home/component/registration.component';
// import { AccountComponent }     from './home/component/account.component';
// import { ViewjobComponent }     from './home/component/viewjob.component';
var app_routes = [
    { path: '', component: home_component_1.HomeComponent },
];
exports.app_routing = router_1.RouterModule.forRoot(app_routes);
//# sourceMappingURL=app.routing.js.map