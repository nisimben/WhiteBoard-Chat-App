import * as io from 'socket.io-client';
import { Observable, from, Subject } from 'rxjs';
import { OnInit, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:4000';
  private socket;
  public subject: Subject<any>;

  constructor() {
    this.socket = io(this.url)
  }



  public sendMessage(message) {
    this.socket.emit('msgToServer', message);
  }
  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('msgToClient', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }
  public sendCordinates(data) {
    this.socket.emit('drawToServer', data)
  }
  public getCordinates = () => {
    return Observable.create((obsever) => {
      this.socket.on('drawToClient', (data) => {
        console.log("drawToClient");
        
        console.log(data);
        obsever.next(data);

      });
    });
  }

}
