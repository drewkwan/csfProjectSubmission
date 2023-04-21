import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: User;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = JSON.parse(localStorage.getItem('userData')!)
      if (!this.user) {
        console.log('User not found')
        return false;
      }
      console.log(this.user);
      return true;
  }
  
}
