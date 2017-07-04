import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class CreateformService{
    constructor(private _http: Http){
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
}