import { Component } from '@angular/core';
import { DbService } from './services/db.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin:boolean =false
  result
  constructor(private svr:DbService){
    this.svr.isLogin$.subscribe((data:boolean)=>{
      this.isLogin = data
    })
  }
  logOut(){
    localStorage.removeItem("userName")
    this.svr.isLogin$.next(false)
    this.result ="Hello Geust"
    
  }
  
  title = 'ng-canvas';
}
