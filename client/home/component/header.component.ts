import { Component, OnInit,Input, ViewChild,ElementRef  } from '@angular/core';
import {FormBuilder,Validators,FormGroup,FormControl} from "@angular/forms";
import { LoginHelper } from "./guards/login.helper";
import { CustomerService } from '../service/customer.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
// declare var $:JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'header-app',
    providers:[CustomerService,LoginHelper],
    templateUrl: 'header.component.html'
})
export class HeaderComponent{
    @ViewChild('closeBtn') closeBtn: ElementRef;
    constructor( private fb: FormBuilder ,private _loginHelper: LoginHelper,private _router: Router,private _customerservice: CustomerService) {}
    
    login: FormGroup;
    msg : String ;
    subscription: Subscription;
    success : String;
    anyError : String;
    customerId : String;
    logo : String= "https://www.recsite.com/images/jobsite_logo2.gif";

    ngOnInit(){
        this.loginForm();
    }

    loginForm()
    {
        this.login = this.fb.group({
            "email":["",Validators.compose([Validators.required, this.mailFormat])],
            'password': ["",Validators.compose([Validators.required])]
        });
    }

    mailFormat(control: FormControl): any 
    {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
        return { "incorrectMailFormat": true };
        }
        return null;
    }

    submitLogin(loginForm: FormGroup):void 
    {
        if (loginForm.valid)
        {
            console.log('inside login conpoennt===');
            console.log(loginForm.value.email);
            // return;
            this.subscription = this._customerservice.login(loginForm.value)
                .subscribe((response:any) =>
                {
                   console.log('res from loginnn api ==== ')
                  console.log(response.success);
                  if(response.success === true)
                    {
                        console.log('inside response===');
                        localStorage.setItem('customer_token', response.msg);
                        alert('Thank you for login');
                        this.customerId = localStorage.getItem('customer_token');
                        this._router.navigate(['/account']);
                        this.closeBtn.nativeElement.click();
                        
                    }else{
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

    logout()
    {
        alert('Logging out !!!');
        localStorage.removeItem('customer_token');
        this.customerId = null;
        this._router.navigate(['/']);
    }

    isLogggedIn() {
        return this._loginHelper.isLogggedIn();
    }
}