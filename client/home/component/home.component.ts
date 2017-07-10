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
    emptyJobList : Boolean;
    ngOnInit() 
    {
        this._homeservice.getHomeContent()
        .subscribe((response:any) =>
        {
            this.joblist = response.msg;
            if(this.joblist.length < 1)
            {
                this.emptyJobList = true;
            }else{
                this.emptyJobList = false;
            }
        })
    }
    
    cutString(str : String)
    {
       length = 50;
       str = str.length > length ? str.substring(0, length - 3) + "..." : str ;
       return str;
    }

}