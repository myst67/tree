import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HomeService{
    constructor(private _http: Http){
    }

    getHomeContent(){
        
        return this._http.get('api/dataservice/home')
                    .map(res=>res.json());
    }
}