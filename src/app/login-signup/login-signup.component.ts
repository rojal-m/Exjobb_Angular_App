import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { userObj } from '../../model/userLogin';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  showLogin = true;
ngForm: any;

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['/overview']);
    }
  }

  login(loginForm: NgForm) {
    // Get form values and call login API
    console.log(loginForm)
    const credentials = loginForm.value;
    this.userService.login(credentials).subscribe({
      next: (response) => {
        // Handle successful login
        const user: userObj =  response;
        console.log(user);
        localStorage.setItem('token', user._id);
        this.router.navigate(['/overview']);
      },
      error: (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    }
    );
  }

  signup(signupForm: NgForm) {
     // Get form values and call signup API
     const user = signupForm.value;
     this.userService.signup(user).subscribe({
      next: (response) => {
         // Handle successful signup
         const user: userObj =  response;
         console.log(user);
         localStorage.setItem('token', user._id);
         this.router.navigate(['/overview']);
       },
       error: (error) => {
         // Handle signup error
         console.error('Signup failed:', error);
       }
      }
     );
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}
