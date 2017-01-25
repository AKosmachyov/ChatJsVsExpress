import { Component } from '@angular/core';

@Component({
    selector: 'room',
    template: `
            <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
            <div>
                <span>Room#12</span>
                <span>online: 15</span>
            </div>
    `,
    styles: [`
        img {
            height: 90px
        }
        img + div {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    `]
})
export class RoomComponent {
}
