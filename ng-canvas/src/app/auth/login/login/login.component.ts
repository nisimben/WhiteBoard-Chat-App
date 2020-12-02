import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { UserLogin } from 'src/app/models/UserDto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  notRecognized: string = null
  constructor(public srv: AuthService, public router: Router, public svDb: DbService) { }
  result:string =" "
  isLogin:boolean =false
  onSubmit(f: NgForm) {
      
    
      // check if user in list Array
      // if (f.value.name == this.svDb.getUser() && f.value.password == this.svDb.getPassword()) {
          const newloginUser = new UserLogin()
          newloginUser.email =f.value.name
          newloginUser.password = f.value.password
          console.log("aaa",newloginUser);
          
          this.svDb.login(newloginUser)
        this.srv.isAuthenticate = true;
        console.log(this.result+' onsubmit login');
        this.isLogin=true
        console.log('yes');
        this.router.navigate(['/home'])
        return
      // }
    
    this.notRecognized = 'You Are Not Recognized';
    console.log("no");
  }

   closeError(){
     this.notRecognized=null
   }
   navigateToReset(){
    this.router.navigate(['/reset'])
  }
  logOut(){
    localStorage.removeItem("userName")
    this.svDb.isLogin$.next(false)
    this.result = 'Hello Guest'
  }



  ngOnInit(): void {
    
    if (localStorage.getItem("userName")) {
      this.svDb.isLogin$.next(true)
     this.result = localStorage.getItem("userName")
      this.result = `Wellcome  ${this.result}`   
    }
    else{
      this.logOut()
    }

    
  }
};
