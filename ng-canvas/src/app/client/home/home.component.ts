import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
 import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
 import * as io from 'socket.io-client';
import { DbService } from 'src/app/services/db.service';
import { ChatService } from 'src/app/services/chat.service';
import { Subject, fromEventPattern } from 'rxjs';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLogin:boolean
  room: string
  
  public cx: CanvasRenderingContext2D
  message: string
  messages: string[] = [];
  // lineWidth = 3
  
  can = new Subject()
  
  @Input() lineWidth = 5;
  @Input() public width = 900;
  @Input() public height = 500;
  
  @Input() markerColor = ""
  
  
  
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('cursor ') cursor: ElementRef;
  socket = io('http://localhost:4000')
  constructor(private svDb: DbService, private chatService: ChatService) { }
  
  user: string =localStorage.getItem("userName")
  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  // public drawLine(context, x1, y1, x2, y2) {
  //   context.beginPath();
    // context.strokeStyle = 'black';
  //   context.lineCap = 'round';
  //   context.moveTo(x1 + 20, y1 + 20);
  //   context.lineTo(x2 + 20, y2 + 20);
  //   context.stroke();
  //   context.closePath();
    
  // }
  /**
   * CHAT
   */
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


  /**
   * CANVAS
   */
  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.captureEvents(canvasEl);



    // When true, moving the mouse draws on the canvas
    let isDrawing = false;
    let x = 0;
    let y = 0;
    this.cx.lineCap = 'round';
  
    // this.cx.strokeStyle = '#000000';



    // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

    // Add the event listeners for mousedown, mousemove, and mouseup
  }
    private captureEvents(canvasEl: HTMLCanvasElement) {
      // this will capture all mousedown events from the canvas element
      fromEvent(canvasEl, 'touchstart')
        .pipe(
            switchMap((e) => {
                return fromEvent(canvasEl, 'touchmove')
                    .pipe(
                        takeUntil(fromEvent(canvasEl, 'touchend')),
                        pairwise()
                    )
            })
        )
        .subscribe((res: [TouchEvent, TouchEvent]) => {
            const rect = canvasEl.getBoundingClientRect();
    
            // previous and current position with the offset
            const prevPos = {
              x: res[0].touches[0].clientX - rect.left,
              y: res[0].touches[0].clientY - rect.top
            };
      
            const currentPos = {
              x: res[1].touches[0].clientX - rect.left,
              y: res[1].touches[0].clientY - rect.top
            };
      
            // this method we'll implement soon to do the actual drawing
            this.drawOnCanvas(prevPos, currentPos,this.markerColor, this.lineWidth);
            this.socket.emit("drawToServer",{prevPos: prevPos, currentPos: currentPos,color: this.markerColor, size: this.lineWidth});
  

        })

      fromEvent(canvasEl, 'mousedown')
        .pipe(
          switchMap((e) => {
            // after a mouse down, we'll record all mouse moves
            return fromEvent(canvasEl, 'mousemove')
              .pipe(
                // we'll stop (and unsubscribe) once the user releases the mouse
                // this will trigger a 'mouseup' event    
                takeUntil(fromEvent(canvasEl, 'mouseup')),
                // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                takeUntil(fromEvent(canvasEl, 'mouseleave')),
                // pairwise lets us get the previous value to draw a line from
                // the previous point to the current point    
                pairwise()
              )
          })
        )
        .subscribe((res: [MouseEvent, MouseEvent]) => {
          const rect = canvasEl.getBoundingClientRect();
    
          // previous and current position with the offset
          const prevPos = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          };
    
          const currentPos = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top
          };
    
          // this method we'll implement soon to do the actual drawing
          this.drawOnCanvas(prevPos, currentPos,this.markerColor, this.lineWidth);
          this.socket.emit("drawToServer",{prevPos: prevPos, currentPos: currentPos,color: this.markerColor, size: this.lineWidth});

        });
    }
 

  
    private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }, color, size) {
        this.cx.strokeStyle = color;
        this.cx.lineWidth = size;
      if (!this.cx) { return; }
  
      this.cx.beginPath();
  
      if (prevPos) {
        this.cx.moveTo(prevPos.x, prevPos.y); // from
        this.cx.lineTo(currentPos.x, currentPos.y);
        this.cx.stroke();
      }

      this.cx.strokeStyle = this.markerColor;
    }
    enlargeLine() {
      this.lineWidth++
      console.log(this.lineWidth);
  
    }
    lowLine() {
      this.lineWidth--
      console.log(this.lineWidth);
  
    }
    clearCanvas() {
      console.log('clear that canvas');
      this.cx.clearRect(0, 0, this.width, this.height);
    }
    eraser() {
      this.markerColor = "#FFFFFF";  
    }

  ngOnInit(): void {
   this.user = localStorage.getItem("userName")
    
   
    
    // subscribe to Chat Service
    this.chatService.getMessages().subscribe((val) => {
      console.log(val,'getMessages');
      this.messages.push(val)

    }) 
    this.socket.on("drawToClient",function(data){
      this.drawOnCanvas(data.prevPos,data.currentPos,data.color, data.size);
  }.bind(this))
}

}