import {Injectable} from '@angular/core';

import { UserService } from './user.service';
import { Message } from '../classes/message';

@Injectable()
export class SocketService{
    private  messages = [];
    constructor( private userService: UserService ){
        this.socket = io('http://localhost:8000');
        this.socket.on('newMessage', this.incomingMessage.bind(this));
    }
    incomingMessage(data: Message){
        this.messages.push(data);
    }
    sendMessage(text: string){
        let message: Message = {
            user: this.userService.getUser(),
            text: text,
            time: (new Date()).toString()
        };
        this.socket.emit('sendNewMessage', message);
        this.incomingMessage(message);
    }
    getMessages(){
        return this.messages;
    }
}