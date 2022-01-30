import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../Services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _notificationService: NotificationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('auth_token') != null) {
         
          return true;
      }
      else {
         
          this._notificationService.fail('Log In again');
          this._router.navigate(['/login']);
      }
  }
  
}
