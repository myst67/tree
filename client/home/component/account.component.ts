import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import {FormBuilder,Validators,FormGroup,FormControl} from "@angular/forms";
import { HomeService } from '../service/home.service';
import { Router } from "@angular/router";
import { CustomerService } from '../service/customer.service';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'account-app',
    providers:[CustomerService],
    templateUrl: 'account.component.html'
})
export class AccountComponent{
    
    constructor( private fb: FormBuilder ,private _router: Router,private _accountservice: CustomerService) {}

    anyError : String ;
    subscription: Subscription;
    token : String;
    isCustomerLoggedin : Boolean = false;
    buttonIsHide : String = 'false';
    documentName : String;
    userDetails : Object;
    firstname : String;
    lastname : String;
    email : String;
    dob:String;
    location:String;
    phone:String;
    noDocumentMsg : String;
    craete_date  :String;
    docUrl : String;
    public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3001/upload' });

    ngOnInit() 
    {
        var customer_token = localStorage.getItem('customer_token');
        
        if(!customer_token)
        {
            this._router.navigate(['/']);
            return;
        }

        this.subscription = this._accountservice.getCustomer(customer_token)
            .subscribe((response:any) =>
            {
                if(response.success === true)
                {
                    this.firstname = response.msg.firstname;
                    this.lastname = response.msg.lastname;
                    this.email = response.msg.email;
                    this.dob = response.msg.dob;
                    this.location = response.msg.location;
                    this.phone = response.msg.phone;
                    this.craete_date = response.msg.craete_date;

                    this.haveDocument(customer_token);
                    
                }else{
                    this.anyError = response.msg;
                }
            },
            error => {
                this.anyError=error;
        });

        
    }

    uploadFile(item:any)
    {
        item.upload();
        
        this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
            var actualResponse = JSON.parse(fileItem._xhr.response);
            if(status == 200 && actualResponse.success === true)
            {
                this.token = localStorage.getItem('customer_token');
                this.subscription = this._accountservice.saveDocument(this.token,actualResponse.msg)
                .subscribe((response:any) =>
                {
                    if(response.success === true)
                    {
                        this.buttonIsHide = 'true';
                        this.documentName = response.msg;
                        this.docUrl = 'uploads/'+this.documentName;
                        this.anyError = '';
                        this.noDocumentMsg = '';
                    }else{
                        this.anyError = response.msg
                    }
                },
                error => {
                    this.anyError=error;
            });
            }
        }
        
    }

    haveDocument(token:String):any {

        this.subscription = this._accountservice.haveDocument(token).subscribe((response:any) =>
            {
                if(response.success === true)
                {
                    this.documentName = response.msg;
                    this.docUrl = 'uploads/'+this.documentName;
                }else{
                    this.noDocumentMsg = 'you dont have and resume';
                }
            },
            error => {
                this.anyError=error;
        });
    }
}