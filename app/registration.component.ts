import { Component, ViewChild } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';

@Component({
    selector: 'sing-up',
    template: `
        <modal #singUpModal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Sing up</h4>
            </modal-header>
            <modal-body>
                <input type="text">
            </modal-body>
            <modal-footer>        
                <button type="button" class="btn btn-primary" (click)="modal.close()">Ok</button>
            </modal-footer>
        </modal>
        `
})
export class RegistrationComponent {
    @ViewChild('singUpModal')
    modal: ModalComponent;

    open(){
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
}