import { Component } from '@angular/core';

@Component({
    selector: 'message-box',
    template: `
        <div class="main-div">
            <textarea></textarea>
            <button>Отправить</button>           
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
export class MessageBox { }