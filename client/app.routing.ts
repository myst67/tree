import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }     from './home/component/home.component';
import { CraetejobComponent }     from './home/component/craetejob.component';

const app_routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'createJob',  component: CraetejobComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);