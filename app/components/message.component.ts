import { Input, Component } from '@angular/core';

import { Message } from '../classes/message';

@Component({
    selector: 'message',
    template: `
        <div>
            <img src={{message.user.avatarLink}}>
            <b>{{message.user.userName}}</b>
            <pre>{{message.text}}</pre>
        </div>
    `,
    styles: [`
        div {
            width: 50%;
        }
        img {
            height: 35px;
        }
    `]
})
export class MessageComponent {
    @Input() message: Message;
}