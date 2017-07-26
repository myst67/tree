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
    // currentNodeId = 1;
    currentnodeValue = 0;
    currentDepth = 1;
    treeId : any;
    currentObject : Object;
    updatedObject : any;
    maxDepth : any;
    maxDepthArray :Array<any>;
    dynamicWidth : any;
    isDisabled : Boolean;


    constructor( private _homeservice: HomeService) {
        this.currentObject = [{
            "depth": this.currentDepth,
            "items":[{
                    "id": 1,
                    "value": 0
                }
                ]
        }]
    }

    createTree(treename:string)
    {
       this.treenamea = treename;
       if(this.treenamea)
       {
           this.currentObject[0]['treename'] = this.treenamea;
           this._homeservice.getHomeContent(this.currentObject).subscribe((response:any) =>
            {
                if(response.success === true)
                {
                    this.isDisabled = true;
                    this.currentObject[0]['treeId'] = response.msg;
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
            this._homeservice.updateHomeContent(this.currentnodeValue,this.treeId).subscribe((response:any) =>
            {
                if(response.success === true)
                {
                    this.updatedObject = response.msg.updatedNodeData.data;
                    this.maxDepth = response.msg.maxDepth;
                    this.maxDepthArray = new Array(this.maxDepth);

                    this.updatedObject.sort((a:any,b:any)=>{
                        if(a.value < b.value) return -1;
                        else if(a.value > b.value) return 1;
                        else return 0;
                    })

                    for(let i=1;i<=this.maxDepth;i++)
                    {
                        this.dynamicWidth = 100/this.updatedObject[0][i].length;
                        for(let j=0;j<this.updatedObject[0][i].length;j++)
                        {
                            this.updatedObject[0][i].width = this.dynamicWidth;
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