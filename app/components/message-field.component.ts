import { Component } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { Message } from  '../classes/message';

@Component({
    selector: 'message-field',
    template: `
        <div>            
            <message *ngFor="let message of messages" [message]="message">></message>            
        </div>
    `
})
export class MessageFieldComponent {
    messages: Message[];
    constructor(private socketService: SocketService){
        this.messages = this.socketService.getMessages();
    }
}