import { Component } from '@angular/core';

@Component({
    selector: 'room-bar',
    template: `
        <div class="search-block">
            <input type="text" placeholder="Поиск">
        </div>
        <div style="overflow: auto">
        <div class="room" (click)="ChangeBackground">
            <div class="room-content">
                <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
                <div class="room-text">
                    <span class="title-room">Room#12</span>
                    <span>online: 15</span>
                </div>
            </div>
        </div>
        <hr>
        <div class="room">
            <div class="room-content">
                <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
                <div class="room-text">
                    <span class="title-room">Room#12</span>
                    <span>online: 15</span>
                </div>
            </div>
        </div>
        <div class="room">
            <div class="room-content">
                <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
                <div class="room-text">
                    <span class="title-room">Room#12</span>
                    <span>online: 15</span>
                </div>
            </div>
        </div>
        <div>
        <div class="room">
            <div class="room-content">
                <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
                <div class="room-text">
                    <span class="title-room">Room#12</span>
                    <span>online: 15</span>
                </div>
            </div>
        </div>
        <div class="room">
            <div class="room-content">
                <img class="img-circle" src="http://www.bdsteele.com/wp-content/uploads/2015/02/IronMan9-600x600.jpg">     
                <div class="room-text">
                    <span class="title-room">Room#12</span>
                    <span>online: 15</span>
                </div>
            </div>
        </div>
        </div>
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
        .room {            
            margin-top: 10px;
            height: 90px;
        }
        .room-content {
            display: flex;
            flex-direction: row;
            width: 80%;    
            margin: auto;
            padding-top: 5px;
        }
        img {
            height: 80px;
        }
        .room-text {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
        }
        .title-room {
            font-size: 18px;
        }
         .theme { /* any shared styles */ }
 .theme.blue { color: blue; }
 .theme.red { color: red; }
        
    `]
})
export class RoomBarComponent {
    selectedEl(ad){

    }
}
