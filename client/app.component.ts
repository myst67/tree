import { Component,Directive,OnInit } from '@angular/core';

@Component({ 
  moduleId: module.id,
  selector: 'app-container',
  template: `
  <header-app></header-app>
  <div id="all">
    <div id="content" class="main-container-section">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styleUrls:['app.component.css']
})
export class AppComponent implements OnInit{

    ngOnInit() {   
    }

    
}