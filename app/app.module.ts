import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';
import { RegistrationComponent } from './registration.component';

import {UserService} from './user.service'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2Bs3ModalModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        RegistrationComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [UserService]
})

export class AppModule { }