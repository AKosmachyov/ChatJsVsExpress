import { Component } from '@angular/core';

@Component({
    selector: 'room-bar',
    template: `
        <div class="search-block">
            <input type="text" placeholder="Поиск">
        </div>
        <room></room>
        <room></room>
    `,
    styles: [`
        .search-block{
            height: 40px;    
            display: flex;
        }
        input {
            margin: auto;
            width: 80%;
            height: 25px;
            text-align: center;
        }
        room {
            display: flex;
            justify-content: center;
        }
    `]
})
export class RoomBarComponent {
}
