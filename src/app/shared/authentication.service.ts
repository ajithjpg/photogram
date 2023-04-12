import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
@Injectable({
    providedIn: 'root',
})
export class AuthService {




    public isAuthenticated() {
        // Check whether the token is expired and return
        // true or false


        if (!isNullOrUndefined(localStorage.getItem('Loggin'))) {

            if (localStorage.getItem('Loggin') == 'allow') {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }

    }
}