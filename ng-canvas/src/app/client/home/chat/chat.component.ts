import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';

import * as io from "socket.io-client";
import { ChatService } from 'src/app/services/chat.service';
import { DbService } from 'src/app/services/db.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked ,AfterContentInit{


  @ViewChild('scrollMe',{static:false})  myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute,private chatService: ChatService,private dbService:DbService) {}
  result
  user: string=''
  chats=[];
  joinned: boolean = false;
  newUser = { nickname: this.user, room: '' };
  msgData = { room: '', nickname: '', message: '' ,updated_at:null}
  socket = io('http://localhost:4000');

  ngAfterContentInit(): void {
    this.scrollToBottom();
  }
  
  ngAfterViewInit(): void {
    this.joinned = false;
  }
  
  ngOnInit() {

     this.dbService.$myUser.subscribe(data =>{
       
       let userFromDb = data
       console.log(userFromDb,"Behav");
     })

    
      
      
    
    // var user = JSON.parse(localStorage.getItem("user"));
    // if(this.user!==null) {
      // this.joinRoom();
      // this.msgData = { room: user.room, nickname: user.nickname, message:'',updated_at:null}
      // this.joinned = true;
   
    
      
    // } 

  
    //  subscribe to Chat Service
    // this.chatService.getMessages().subscribe((val ) => {
    //   console.log(val,'getMessages');
    //   // this.chats.push(val);
    //   this.msgData = {room: user.room,nickname: user.nickname, message: '' }
    //   this.scrollToBottom()

    // }) 
    this.socket.on('msgToClient', function (data) {
      console.log(data,"data");
      if(data.room === JSON.parse(localStorage.getItem("user")).room) {
        
        this.msgData = { room: 'userFromDb', nickname: '', message:'',updated_at:new Date() }
        this.chats.push(data);
        this.scrollToBottom();
      }
    }.bind(this));
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.msgData);
    this.msgData.message= '';
  }

  ngAfterViewChecked(): void {
    
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.log(err);
      
    }
  }
  joinRoom(): void {
    this.dbService.updateUserRoom(this.newUser.room).subscribe() ;
    // this.newUser = { nickname: "", room: '' };
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    // if (this.newUser.room) {
      
      this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: this.msgData.message ,updated_at: date};
      this.joinned = true;
      this.socket.emit('msgToClient', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
      this.chatService.joiningRoom(this.msgData)
      console.log("\n---------------------------------------------\n"+this.newUser.nickname + " JOINED ROOM: " + this.newUser.room +"\n---------------------------------------------\n");
      // var user = JSON.parse(localStorage.getItem("user"));
      this.scrollToBottom();
    // }
  }

  logout() {
    // if (user.room == this.msgData.room) {
      console.log(this.newUser,"this.newUser");
      
      console.log(user,"user");
      console.log(this.msgData,"this.msgData");
      
      var date = new Date();
      var user = JSON.parse(localStorage.getItem("user"));
      this.socket.emit('leftRoom',{ room: user.room, nickname: user.nickname, message: 'Left this room' })
      this.socket.emit('msgToClient', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
      localStorage.removeItem("user");
      this.joinned = false;
      console.log("a user left the room")
    // }else{
    //   alert("adasd")
    // }
  }
}