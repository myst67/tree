import { Component, OnInit,Input, ViewChild,ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { CreateformService } from '../service/createform.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute,Params } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
    moduleId: module.id,
    selector: 'viewjob-app',
    providers:[CreateformService,CustomerService],
    templateUrl: 'viewjob.component.html'
})
export class ViewjobComponent{
    
    
    constructor( private _router: Router,private _route: ActivatedRoute,private _viewjobservice: CreateformService,private _accountservice: CustomerService) {}
    jobId : number;
    subscription: Subscription;
    anyError : String;
    label : String;
    description : String;
    company : String;
    location : String;
    recruiter_name : String;
    recruiter_ph : String;
    craete_date : String;
    jobRefId : String;
    docRes : String;
    customer_token :String;

    ngOnInit() 
    {
        if(this._route.snapshot.params['id']){
            this.jobId = this._route.snapshot.params['id'];
        }else{
            this._router.navigate(['/']);
            return;
        }

        this.customer_token = localStorage.getItem('customer_token');

        this.subscription = this._viewjobservice.getJobDetails(this.jobId)
            .subscribe((response:any) =>
            {
                // console.log('Get customer data into dom===');
                // console.log(response);
                //response = response[0];
                console.log(response);
                if(response.success === true)
                {
                    this.label = response.msg[0].label;
                    this.company = response.msg[0].company;
                    this.description = response.msg[0].description;
                    this.location = response.msg[0].location;
                    this.recruiter_name = response.msg[0].recruiter_name;
                    this.recruiter_ph = response.msg[0].recruiter_ph;
                    this.craete_date = response.msg[0].craete_date;
                }else{
                    this.anyError = response.msg;
                }
            },
            error => {
                this.anyError=error;
            });
     }

    applyJob()
    {
        if(!this.customer_token)
        {
            this.anyError = 'Please login before applying job';
        }else{
            this.isUserHaveDocument();
        }
       
    }

    isUserHaveDocument(){
        
        // this.docRes = false;
        

        this.subscription = this._accountservice.haveDocument(this.customer_token)
            .subscribe((response:any) =>
            {
                // console.log('after applying===');
                // console.log(response);
                // return false;

                if(response.success === false)
                {
                    this.anyError = response.msg;
                }else{
                    this.subscription = this._viewjobservice.applyJob(this.jobId)
                    .subscribe((data:any) =>
                    {
                        if(data.success === true)
                        {

                            this.jobRefId = data.msg;
                            
                        }else{
                            console.log(data.msg);
                            this.anyError = data.msg;
                        }
                    },
                    error => {
                        this.anyError=error;
                    });
                }
            },
            error => {
                this.anyError=error;
        });
    }
    
}