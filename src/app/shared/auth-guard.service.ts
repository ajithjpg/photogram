import { AuthService } from './authentication.service'
import { tap, map, take } from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|any {
    if (this.authService.isAuthenticated()) {
        //this.router.navigate(['/pages/login']);
    } else {
        this.router.navigate(['/pages/login']);
    }
  }
}


  



