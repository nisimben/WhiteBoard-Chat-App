import { Injectable } from '@angular/core';
import { User } from '../models/UserModel'
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { UserLogin } from '../models/UserDto';



@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) { }
  newUser: User = new User()
  // userList = [{
  //   name: 'aaa',
  //   email: 'a@a.com',
  //   password: 1234
  // },
  // {
  //   name: 'bbb',
  //   email: 'a@a.com',
  //   password: 1234
  // },
  // {
  //   name: '1',
  //   email: '',
  //   password: 1
  // },
  // {
  //   name: 'nisim',
  //   email: '',
  //   password: 1
  // }
  // ]
  public users: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  public isLogin$: Subject<boolean> = new Subject<boolean>()
  // current = this.users.asObservable()

  post(username: string, email: string, password: string) {

    this.newUser.username = username
    this.newUser.email = email
    this.newUser.password = password
    return this.http.post('http://localhost:4000/user', this.newUser)
  }
  getUser() {
    const username = this.newUser.username
    console.log(username);

    return username
  }
  getPassword() {
    const password = this.newUser.password
    console.log(password);

    return password
  }
  login(user:UserLogin) {
    return this.http.post('http://localhost:4000/user/login', user).subscribe((data)=>{
      console.log("asdsadsadsadsad",data);
      
    })
  }

}
