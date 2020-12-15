import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   result:string 
  constructor(public svDb:DbService ,private router:Router) { }
  
  onSubmit(f: NgForm) {
    
    // adding user to list array
    // this.svDb.userList.push(f.value)
    
    // this.result = this.svDb.getUser()
    // this.svDb.users.next(f.value.name)

    /*
    Data |Base connection
    */

    this.result = f.value.name
    localStorage.setItem("userName",this.result)
    console.log(`my name ${this.result}`);
    
    this.svDb.post(f.value.name,f.value.email,f.value.password)
    
   
    this.router.navigate(['/login'])
    
  }


  ngOnInit(): void {
   
    if (localStorage.getItem("userName")) {
      console.log("aa",localStorage.getItem("userName"));
      this.svDb.isLogin$.next(true)
      
      this.result = localStorage.getItem("userName")
      this.result =`Hello   ${this.result}   Please Go To Login Page`
    }else{
      // localStorage.removeItem('userName')
      this.svDb.isLogin$.next(false)
      this.result ='Hello Guest'
    }
    
  }
}
