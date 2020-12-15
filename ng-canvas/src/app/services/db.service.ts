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
  $myUser:BehaviorSubject<any> = new BehaviorSubject(null)
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
  // public users: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  public isLogin$: Subject<boolean> = new Subject<boolean>()
  public isRegister$: Subject<boolean> = new Subject<boolean>()
  // current = this.users.asObservable()

  post(username: string, email: string, password: string ,room?:string) {
    this.newUser.username = username
    this.newUser.email = email
    this.newUser.password = password
    this.newUser.room =room
    this.http.post('http://localhost:4000/user', this.newUser).subscribe(data =>{
      console.log(data,"post service");
      
    return this.$myUser.next(data)
      
    })
  }

  updateUserRoom(roomName:string){
    const userId = this.newUser['id'] ;   
    console.log("eli---", roomName, userId);
     
    return this.http.put('http://localhost:4000/user/username', {roomName, userId}) ;
  }


  getUser(username:string) {
    
     this.http.get('http://localhost:4000/user/username').subscribe(data =>{
       console.log(data,"service");
       
       return this.$myUser.next(data)
    })
  }
  getPassword() {
    const password = this.newUser.password
    console.log(password);

    return password
  }
  login(user:UserLogin) {
    return this.http.post<User>('http://localhost:4000/user/login', user)
  }
  getAll(){
    return this.http.get('http://localhost:4000/user')
  }

}
