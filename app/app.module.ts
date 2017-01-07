import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';

import { AppComponent } from './components/app.component.ts';
import { TopBarComponent } from './components/top-bar.component.ts';
import { RegistrationComponent } from './components/registration.component.ts';
import { AuthorizationComponent } from './components/authorization.component.ts';

import { UserService } from './services/user.service.ts';
import { HttpService } from  './services/http.service.ts';

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
        RegistrationComponent,
        AuthorizationComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        UserService,
        HttpService        
    ]
})

export class AppModule { }