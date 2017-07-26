import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { app_routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/component/home.component';
import { HeaderComponent } from './home/component/header.component';

import { DropdownModule } from "ng2-dropdown";

const app_modules: any = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  app_routing
];

@NgModule({
  imports: [
    ...app_modules,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
