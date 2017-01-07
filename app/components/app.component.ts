import { Component } from '@angular/core';

import { TopBar } from './top-bar.component.ts';

@Component({
    selector: 'my-app',
    template: `
        <div class="hidden-xs col-sm-3 navigation-bar"></div>
        <div class="col-xs-12 col-sm-9 message-block">                 
            <top-bar class="top-bar"></top-bar>
            <div class="message-list ">
                message
            </div>
            <div class="input-box">
                <textarea></textarea>
            </div>
        </div>
        `
})
export class AppComponent {
}