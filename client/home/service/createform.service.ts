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
        return this._http.post(
                    'api/dataservice/createjob',
                    JSON.stringify(createjobForm),
                    {headers:headers}
                ).map(res=>res.json());
    }

    getJobDetails(jobId : any){
        
        console.log('inside service');
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('jobId',jobId);

        return this._http.get('api/dataservice/viewjob',{headers:headers})
                    .map(res=>res.json());
    }

    applyJob(jobId : any){
        
        var applyJobData = {jobId:jobId,token:localStorage.getItem('customer_token')};
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        return this._http.post(
                    'api/dataservice/applyJob',
                    JSON.stringify(applyJobData),
                    {headers:headers}
                ).map(res=>res.json());
    }
}