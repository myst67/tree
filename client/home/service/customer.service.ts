import {Injectable} from "@angular/core";
import {Http,Headers, Response } from "@angular/http";
import { Observable } from 'rxjs';
import "rxjs/add/operator/map";

@Injectable()
export class CustomerService{
    
    public token: string;
    constructor(private _http: Http){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    saveJob(createjobForm : any){
        
        console.log('inside service');
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('formLabel',createjobForm.label);
        headers.append('formDes',createjobForm.job_description);
        headers.append('formCompany',createjobForm.company);
        headers.append('formLocation',createjobForm.location);
        headers.append('formRecruiterName',createjobForm.recruiter_name);
        headers.append('formRecruiterPh',createjobForm.recruiter_ph);

        return this._http.get('api/dataservice/createjob',{headers:headers})
                    .map(res=>res.json());
    }

    saveDocument(token : any,filename:string){
        
        console.log('inside service');
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('token',token);
        headers.append('filename',filename);
        return this._http.post(
                        'api/dataservice/saveDocument',
                        JSON.stringify({token:token,filename:filename}),
                        {headers:headers}
                        )
        .map(res=>res.json());

    }

    register(registerFormValues: Object){
        // console.log(JSON.stringify(customerCredentials));
        console.log('reg form value data ==== ');
        console.log(registerFormValues);
        // return;
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        return this._http.post(
                            'api/dataservice/register',
                            JSON.stringify(registerFormValues),
                            {headers:headers}
                            )
            .map(res=>res.json());
    }

    login(loginFormValues: Object):Observable<boolean>{
        // console.log(JSON.stringify(customerCredentials));
        var headers = new Headers();
       // var loginFormValues = {username:username,password:password}
         headers.append('Content-Type','application/json')
        return this._http.post(
                            'api/dataservice/login',
                            JSON.stringify(loginFormValues),
                            {headers:headers}
                            )
            .map(res=>res.json());
    }

    getCustomer(customer_toekn: any){
        // console.log('inside customer service===');
        // console.log(customer_toekn);
        // return;
        var headers = new Headers();
       // var loginFormValues = {username:username,password:password}
        headers.append('Content-Type','application/json')
        headers.append('customer_token',customer_toekn)
        return this._http.get(
                            'api/dataservice/customerDetails',
                            {headers:headers}
                            )
            .map(res=>res.json());
    }

    haveDocument(customer_toekn: any)
    {
        // console.log('inside account service=====');
        // console.log(customer_toekn);
        
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('customer_token',customer_toekn)
        return this._http.get(
                            'api/dataservice/haveDocument',
                            {headers:headers}
                            )
            .map(res=>res.json());
    }
}