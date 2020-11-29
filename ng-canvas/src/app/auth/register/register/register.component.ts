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
result:any
  constructor(public svDb:DbService ,private router:Router) { }
  onSubmit(f: NgForm) {
    
    // adding user to list array
    this.svDb.userList.push(f.value)
    
    this.result = this.svDb.getUser()
    this.svDb.users.next(f.value.name)
   
    this.router.navigate(['/login'])
    
  }


  ngOnInit(): void {
    this.svDb.users.subscribe(user => this.result = user)
    console.log(this.result);
    
  }
}
