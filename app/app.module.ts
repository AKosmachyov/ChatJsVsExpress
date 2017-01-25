import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2bs3modal/ng2-bs3-modal';
import { DropdownModule } from "ng2dropdown";

import { AppComponent } from './components/app.component';
import { TopBarComponent } from './components/top-bar.component';
import { RegistrationComponent } from './components/registration.component';
import { AuthorizationComponent } from './components/authorization.component';
import { MessageFieldComponent } from './components/message-field.component';
import { MessageBox } from './components/message-box.component';
import { MessageComponent } from './components/message.component';
import { RoomBarComponent } from './components/room-bar.component';
import { RoomComponent } from './components/room.component';

import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { SocketService } from './services/socket.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2Bs3ModalModule,
        HttpModule,
        DropdownModule
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        RegistrationComponent,
        AuthorizationComponent,
        MessageFieldComponent,
        MessageBox,
        MessageComponent,
        RoomBarComponent,
        RoomComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        UserService,
        HttpService,
        SocketService
    ]
})

export class AppModule { }