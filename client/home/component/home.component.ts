import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';

@Component({
    moduleId: module.id,
    selector: 'home-app',
    providers:[HomeService],
    templateUrl: 'home.component.html'
})
export class HomeComponent{
    
    treenamea = '';
    currentnodeValue = 0;
    treeId : any;
    currentObject : Object;
    updatedObject : Object;
    passObject : Object;
    maxDepthArray :Array<any>;
    isDisabled : Boolean;


    constructor( private _homeservice: HomeService) {
        this.currentObject = {"items":[{"id": 1,"value": 0,"depth": 1}]}
    }

    createTree(treename:string)
    {
       this.treenamea = treename;
       if(this.treenamea)
       {
           this.currentObject['treename'] = this.treenamea;
           this._homeservice.getHomeContent(this.currentObject).subscribe((response:any) =>
            {
                if(response.success === true)
                {
                    this.isDisabled = true;
                    this.currentObject['treeId'] = response.msg;
                    this.treeId = response.msg;
                }else{
                    alert(response.error);
                }
            })
       }
    }

    
    addNode(value:number)
    {
        this.currentnodeValue = value;
        if(this.currentnodeValue && this.currentObject)
        {
            this.passObject = {"id":this.treeId,"value":this.currentnodeValue};
            this._homeservice.updateHomeContent(this.passObject).subscribe((response:any) =>
            {
                
                if(response.success === true)
                {
                    this.updatedObject = response.msg.newTreeData;
                    this.maxDepthArray = new Array(response.msg.maxdepth);

                    for(let i=1;i<=response.msg.maxdepth;i++)
                    {
                        for(let j=0;j<this.updatedObject[i].length;j++)
                        {
                            this.updatedObject[i].width = 100/this.updatedObject[i].length;
                        }
                    }
                }else{
                    alert(response.msg);
                    console.log(response.msg);
                }
                
            })
        }
    }

}