import { Component, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';
import { HttpService} from './http.service';

import  {User} from '/user';

@Component({
    selector: 'sing-up',
    template: `
        <modal #singUpModal>
            <modal-header [show-close]="true">
                <h4 class="modal-title" style="text-align: center">Регистрация</h4>
            </modal-header>
            <modal-body>            
                <input type="text" [(ngModel)]="singUpData.userName" placeholder="Имя">
                <input type="email" [(ngModel)]="singUpData.email" placeholder="Почтовый адрес">                
                <input type="password" [(ngModel)]="singUpData.password" placeholder="Пароль">                
            </modal-body>
            <modal-footer>        
                <button type="button" class="btn btn-primary" (click)="singUp(singUpData)">Отправить</button>
            </modal-footer>
        </modal>
        `,
    providers: [HttpService]
})
export class RegistrationComponent {
    @ViewChild('singUpModal')
    modal: ModalComponent;
    
    constructor(private httpService: HttpService){}
    
    user: User = {};
    singUpData: {userName: string, email: string, password: string} = {};
    errorMessage: any;
    
    singUp(obj: {userName: string, email: string, password: string}){
        this.httpService.singUp(obj)
            .then(
                avatarLink => {
                    this.user.avatarLink = avatarLink;
                    this.user.userName = obj.userName;
                },
                error =>  this.errorMessage = <any>error
            )
    };    
    open(){
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
}