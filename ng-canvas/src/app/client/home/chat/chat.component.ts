import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

import * as io from "socket.io-client";
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

  chats=[];
  joinned: boolean = false;
  newUser = { nickname: ''};
  msgData = {  nickname: '', message: '' };
  socket = io('http://localhost:4000');
  user: string =localStorage.getItem("userName")
  constructor(private chatService: ChatService) {}
  
  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(this.user!==null) {
      this.msgData = {  nickname: this.user, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    } 

  
    //  subscribe to Chat Service
    this.chatService.getMessages().subscribe(val => {
      console.log(val,'getMessages');
      this.chats.push()
      this.msgData = {nickname: user.nickname, message: '' }

    }) 
  }
  sendMessage() {
    this.chatService.sendMessage(this.msgData);
    this.msgData.message= '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  // sendMessage() {
    

  //   console.log("\nattempting to send message:\n" + JSON.stringify(this.msgData));

  //   this.socket.emit('send-message', this.msgData);

    
  //   let user = JSON.parse(localStorage.getItem("user"));
    
  // }


}