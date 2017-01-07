import { Component, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';
import { HttpService} from '../services/http.service.ts';
import {UserService} from  '../services/user.service.ts';

@Component({
    selector: 'log-in',
    template: `
        <modal #logInModal>
            <modal-header [show-close]="true">
                <h4 class="modal-title" style="text-align: center">Авторизация</h4>
            </modal-header>
            <modal-body>
                <input type="email" [(ngModel)]="logInData.email" placeholder="Почтовый адрес">                
                <input type="password" [(ngModel)]="logInData.password" placeholder="Пароль">                
            </modal-body>
            <modal-footer>        
                <button type="button" class="btn btn-primary" (click)="singUp(logInData)">Войти</button>
            </modal-footer>
        </modal>
        `
})
export class AuthorizationComponent {
    @ViewChild('logInModal')
    modal: ModalComponent;
    logInData: {email: string, password: string} = {};
    errorMessage: any;

    constructor(
        private httpService: HttpService,
        private userService: UserService
    ){}

    singUp(obj: {email: string, password: string}){
        this.httpService.singUp(obj)
            .then(
                (data) => {
                    this.userService.setUser(data);
                    this.logInData = {};
                    this.close();
                },
                (error) =>  this.errorMessage = <any>error
            )
    };
    open(){
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
}