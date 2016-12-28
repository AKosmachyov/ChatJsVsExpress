import { Component } from '@angular/core';

@Component({
    selector: 'top-bar',
    template: `
        <div class="top-bar-left">to NickName</div>
        <div class="top-bar-center">logo</div>
        <div class="top-bar-right">
            <a class="authorization-link">Регистрация</a>
            <a class="authorization-link">Вход</a>
        </div>
        `
})
export class TopBar {
}