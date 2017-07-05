import { Component, OnInit } from '@angular/core';
// declare var $:JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'header-app',
    templateUrl: 'header.component.html'
})
export class HeaderComponent{
    
    logo : String= "https://www.recsite.com/images/jobsite_logo2.gif";

    ngOnInit(){
        
    }
}