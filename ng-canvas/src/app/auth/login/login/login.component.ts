import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  result: any  
  notRecognized: string = null
  constructor(public srv: AuthService, public router: Router, public svDb: DbService) { }

  onSubmit(f: NgForm) {

    for (const i of this.svDb.userList) {
      // check if user in list Array
      if (f.value.name == i.name && f.value.password == i.password) {

        this.srv.isAuthenticate = true;
        this.svDb.users.next(f.value.name)
        console.log(this.result+' onsubmit login');
        
        console.log('yes');
        this.router.navigate(['/home'])
        return
      }
    }
    this.notRecognized = 'You Are Not Recognized';
    console.log("no");
  }
  sendName(){
    return this.svDb.users
   }
   closeError(){
     this.notRecognized=null
   }
   navigateToReset(){
    this.router.navigate(['/reset'])
  }



  ngOnInit(): void {
    // this.result = 'Guest'
    if (this.result !== 'Guest') {
      this.svDb.getUser().subscribe((val) => {
        this.result = val
        console.log(val);
      })
    }
  }
};
