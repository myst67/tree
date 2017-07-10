import { Component, OnInit,Input, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder,Validators,FormGroup,FormControl} from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerService } from '../service/customer.service';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs/Subscription';

// const URL = ;

@Component({
    moduleId: module.id,
    selector: 'registration-app',
    providers:[CustomerService],
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent{
    
    
    constructor( private fb: FormBuilder ,private _router: Router,private _customerservice: CustomerService) {}
    registration: FormGroup;
    msg : String ;
    subscription: Subscription;
    anyError : String;

    public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3001/upload' });
   
    ngOnInit() 
    {
       this.registrationForm();
    }

    registrationForm()
    {
        this.registration = this.fb.group({
            "firstname":["",Validators.compose([Validators.required])],
            "lastname":["",Validators.compose([Validators.required])],
            "email":["",Validators.compose([Validators.required, this.mailFormat])],
            "dob":["",Validators.compose([Validators.required, this.dobFormat])],
            "location":["",Validators.compose([Validators.required])],
            "phone":["",Validators.compose([Validators.required, this.phoneFormat])],
            'passwords': this.fb.group({
                password: ['', Validators.required],
                confirmpassword: ['', Validators.required]
            }, { validator: this.specialValidator })
        });
    }

    submitRegistration(registrationForm: FormGroup):void 
    {
        if (registrationForm.valid)
        {
            this.subscription = this._customerservice.register(registrationForm.value)
                .subscribe((response:any) =>
                {
                    if(response.success === true)
                    {
                        localStorage.setItem('customer_token', response.msg);
                        alert('Thank you for Registration');
                        this._router.navigate(['/account']);
                        
                    }else{
                        console.log(response.msg);
                        this.anyError = response.msg
                    }
                },
                error => {
                    this.anyError=error;
                    console.error(error);
                });
        }else
        {
          this.msg = "Form Is Not Valid";
        }
        // this.createJobForm();
    }

    specialValidator(g: FormGroup)
    {
        return g.get('password').value != '' && g.get('password').value != g.get('confirmpassword').value ? { 'incorrectPassword': true } : null;
    }

    dobFormat(control: FormControl): any 
    {
        var DOB_REGEXP = /([012]?[1-9]|[12]0|3[01])\/(0?[1-9]|1[012])\/([0-9]{4})/;
        if (control.value != "" && (!DOB_REGEXP.test(control.value))) {
        return { "incorrectDateFormat": true };
        }
        return null;
    }

    mailFormat(control: FormControl): any 
    {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
        return { "incorrectMailFormat": true };
        }
        return null;
    }

    phoneFormat(control: FormControl): any 
    {
        var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
        return { "incorrectPhoneFormat": true };
        }
        return null;
    }


    
}