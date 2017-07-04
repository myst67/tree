import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HeaderService{
    constructor(private _http: Http){
    }

    getLogo(){
        
        return this._http.get('api/dataservice/headerdata')
                    .map(res=>res.json());
    }
}