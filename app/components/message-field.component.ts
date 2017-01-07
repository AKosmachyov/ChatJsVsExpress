import { Component } from '@angular/core';

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
    messages: Message [] = [{
        user:{
            userName:'sasha',
            avatarLink: '/images/logo.jpg'
        },
        text: 'Привет',
        time: 'Sun Jan 08 2017 00:16:57 GMT+0300 (Russia Standard Time)'
    },{
        user:{
            userName:'sasha',
            avatarLink: '/images/logo.jpg'},
        text: 'Как так вышло',
        time: 'Sun Jan 08 2017 00:16:57 GMT+0300 (Russia Standard Time)'
    }]
}