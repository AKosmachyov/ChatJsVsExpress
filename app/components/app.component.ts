import { Component } from '@angular/core';

import { TopBar } from './top-bar.component';

@Component({
    selector: 'my-app',
    template: `
        <room-bar class="hidden-xs col-sm-3 navigation-bar"></room-bar>
        <div class="col-xs-12 col-sm-9 message-block">                 
            <top-bar class="top-bar"></top-bar>
            <message-field class="message-list "></message-field>
            <message-box></message-box>
        </div>
    `,
    styles: [`
        message-box {
            height: 60px;           
            border-top: 1.5px solid #d1cbcb;
            display: flex;
        }
        .message-list {
            overflow: auto;
        }
    `]
})
export class AppComponent {
}