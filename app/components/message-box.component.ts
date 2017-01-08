import { Component } from '@angular/core';

import { SocketService } from '../services/socket.service';

@Component({
    selector: 'message-box',
    template: `
        <div class="main-div">
            <textarea [(ngModel)]="text"></textarea>
            <button (click)="send()">Отправить</button>           
        </div>
    `,
    styles: [`
        textarea {
            width: 80%;            
            resize: none;
            font-size: 17px;
            height: 30px;
        }
        .main-div {
            width: 100%;
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;
        }
    `]
})
export class MessageBox {
    text: string;
    
    constructor(private socketService: SocketService){};
    send(){
        this.socketService.sendMessage(this.text);
        this.text = '';
    }
}