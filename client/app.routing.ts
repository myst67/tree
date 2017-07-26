import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }     from './home/component/home.component';
// import { CraetejobComponent }     from './home/component/craetejob.component';
// import { RegistrationComponent }     from './home/component/registration.component';
// import { AccountComponent }     from './home/component/account.component';
// import { ViewjobComponent }     from './home/component/viewjob.component';

const app_routes: Routes = [
  { path: '',  component: HomeComponent },
 // { path: 'createJob',  component: CraetejobComponent },
  // { path: 'register',  component: RegistrationComponent },
  // { path: 'account',  component: AccountComponent},
  // { path: 'viewjob/id/:id',  component: ViewjobComponent}
];

export const app_routing = RouterModule.forRoot(app_routes);