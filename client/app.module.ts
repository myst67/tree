import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { app_routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/component/home.component';
import { HeaderComponent } from './home/component/header.component';
import { CraetejobComponent }     from './home/component/craetejob.component';
import { RegistrationComponent }     from './home/component/registration.component';
import { AccountComponent }     from './home/component/account.component';
import { ViewjobComponent }     from './home/component/viewjob.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard } from './home/component/guards/auth.guard';



import { DropdownModule } from "ng2-dropdown";

const app_modules: any = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  FileUploadModule,
  app_routing
];

@NgModule({
  imports: [
    ...app_modules,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CraetejobComponent,
    HeaderComponent,
    RegistrationComponent,
    AccountComponent,
    ViewjobComponent
  ],
  providers: [
    AuthGuard,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
