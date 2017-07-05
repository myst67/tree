import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
// declare var $:JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'home-app',
    providers:[HomeService],
    templateUrl: 'home.component.html'
})
export class HomeComponent{
    
    constructor( private _homeservice: HomeService) {}
    joblist : any;
    ngOnInit() 
    {
        this._homeservice.getHomeContent()
        .subscribe((response:any) =>
        {
            console.log('res from home api ==== ')
            this.joblist = response;
            console.log(this.joblist);
            // this.msg = 'Thank you for craeting Job. Job id is:'+response;
        })
    }
   
}