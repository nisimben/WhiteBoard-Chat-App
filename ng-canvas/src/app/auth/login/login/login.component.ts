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
  result: string = ' '
  isLogin: boolean = false
  isRegister: boolean = true
  onSubmit(f: NgForm) {

    // this.result = f.value.name

    // check if user in list Array
    const newloginUser = new UserLogin()
    newloginUser.username = f.value.name
    newloginUser.password = f.value.password
 

    this.svDb.login(newloginUser).subscribe(data => {
      if (data) {
        // send user data to service for chat componnet
        this.svDb.$myUser.next(data) ;
        this.svDb.newUser = data ;
        console.log(data, "User login onsubmit");
        this.result =  data['username']
        localStorage.setItem("userName",this.result)
        this.srv.isAuthenticate = true;
        console.log(this.result + ' onsubmit login');
        this.isLogin = true
        console.log('yes');
        this.router.navigate([`/home`])

      }
      else {
        this.notRecognized = 'You Are Not Recognized';
        console.log("no");
      }

    })

  }

  closeError() {
    this.notRecognized = null
  }
  navigateToReset() {
    this.router.navigate(['/reset'])
  }
  logOut() {
    localStorage.removeItem("userName")
    this.svDb.isLogin$.next(false)
    this.result = 'Hello Guest'
  }



  ngOnInit(): void {
    this.svDb.isRegister$.next(true)
    if (localStorage.getItem("userName")) {
      this.svDb.isLogin$.next(true)
      this.result = localStorage.getItem("userName")
      this.result = `Wellcome  ${this.result}`
    }
    else {
      this.logOut()
    }


  }
};
