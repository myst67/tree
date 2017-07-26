import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HomeService{
    constructor(private _http: Http){
    }

    getHomeContent(currentObject:Object){
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        return this._http.post(
                        'api/dataservice/home',
                        JSON.stringify(currentObject),
                        {headers:headers}
                        ).map(res=>res.json());

    }

    updateHomeContent(currentnodeValue:Number,treeId:string){

        var conentvalue = currentnodeValue.toString();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('value',conentvalue);
        headers.append('treeId',treeId)
        return this._http.get('api/dataservice/updateHome',{headers:headers}).map(res=>res.json());
    }
}