import {Injectable} from '@angular/core';

import {User} from './user';

@Injectable()
export class UserService{
    private currentUser: User = {};

    getUser(): User {
        return this.currentUser;
    }
    setUser(obj:User){
        this.currentUser.avatarLink = obj.avatarLink;
        this.currentUser.userName = obj.userName;
    }
}