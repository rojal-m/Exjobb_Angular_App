// auth.guard.ts
import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private userService: UserService, private router: Router) {}

  canActivate():
  | Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree {
    if (this.userService.isUserLoggedIn()) {
      return true;
    } else {
      // Redirect to login page if not logged in
      this.router.navigate(['/login-signup']);
      return false;
    }
  }
}
