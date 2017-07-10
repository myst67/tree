import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import {FormBuilder,Validators,FormGroup,FormControl} from "@angular/forms";
import { HomeService } from '../service/home.service';
import { CreateformService } from '../service/createform.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'createjob-app',
    providers:[CreateformService],
    templateUrl: 'craetejob.component.html'
})
export class CraetejobComponent{
    
    constructor( private fb: FormBuilder ,private _createformservice: CreateformService) {}
    createjob: FormGroup;
    msg : String ;
    subscription: Subscription;
    anyError : String;
    ngOnInit() 
    {
       this.createJobForm();
    }

    createJobForm()
    {
        this.createjob = this.fb.group({
        "label":["",Validators.compose([Validators.required])],
        "job_description":["",Validators.compose([Validators.required])],
        "company":["",Validators.compose([Validators.required])],
        "recruiter_name":["",Validators.compose([Validators.required])],
        "location":["",Validators.compose([Validators.required])],
        "recruiter_ph":["",Validators.compose([Validators.required, this.phoneFormat])]
    });

    }

    phoneFormat(control: FormControl): any 
    {
        var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
        return { "incorrectPhoneFormat": true };
        }
        return null;
    }


    submitJobForm(createjobForm: FormGroup) 
    {
        if (createjobForm.valid)
        {
            // console.log(createjobForm.value);
            // return false;

            this.subscription = this._createformservice.saveJob(createjobForm.value)
                .subscribe((response:any) =>
                {
                    if(response.success === true)
                    {
                         this.msg = 'Thank you for craeting Job. Your Job id is:'+response.msg;
                    }else{
                        this.anyError = response.msg;
                    }
                })
        }else{
          this.anyError = "Form Is Not Valid";
        }
        this.createJobForm();
    }
}