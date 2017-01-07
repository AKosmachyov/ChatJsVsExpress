import { Component } from '@angular/core';
import { UserService } from './user.service';

import  {User} from '/user';

@Component({
    selector: 'top-bar',
    template: `
        <div class="top-bar-left">to NickName</div>
        <div class="top-bar-center">logo</div>
        <div class="top-bar-right">
            <div class="block-link" *ngIf="!user.userName">
                <a class="authorization-link" (click)="singUpWindow.open()">Регистрация</a>
                <a class="authorization-link" (click)="logInWindow.open()">Вход</a>
            </div>
            <div class="user-bar" *ngIf="user.userName">
                <div>
                    <span>{{user.userName}}</span>
                    <img src={{user.avatarLink}} class="img-circle">
                </div>                
            </div>
        </div>         
        <sing-up #singUpWindow></sing-up>
        <log-in #logInWindow></log-in>
        `,
    styles: [`
        .block-link {
            display: flex;
            width: 100%
        }
        .user-bar {
            display: flex;
            width: 100%;
        }        
        img { height: 35px }        
    `]
})
export class TopBarComponent {
    constructor(private userService: UserService){}
    user: User = this.userService.getUser();
}