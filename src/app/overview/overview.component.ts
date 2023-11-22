import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { userObj } from '../../model/userLogin';
import { formOverview } from '../../model/formOverview';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  userInfo!: userObj;
  forms!: formOverview[];
  completedForms!: formOverview[];
  incompletedForms!: formOverview[];
  selectedForm?: formOverview;
  
  constructor(private router: Router, private userService: UserService) {}
  
  ngOnInit(): void {
    this.getUserInfo();
    this.getForms();
  }
  getUserInfo() {
    // Fetch user information
    this.userService.getUserInfo(localStorage.getItem('token')!).subscribe((data) => {
      this.userInfo = data;
      console.log(this.userInfo);
    });
  }
  getForms() {
    // Fetch user forms
    this.userService.getForms(localStorage.getItem('token')!).subscribe((data) => {
      this.forms = data;
      this.completedForms = [];
      this.incompletedForms = [];
      for (let form of this.forms){
        console.log(form);
        if (form.isComplete){
          this.completedForms.push(form);
        }
        else{
          this.incompletedForms.push(form);
        }
      }
      console.log(this.forms);
    });
  }
  
  // Add a method to handle user info editing
  editUserInfo(newData: any): void {
    this.userService.updateUserInfo(localStorage.getItem('token')!, newData).subscribe(() => {
      // Reload user information after update
      this.userService.getUserInfo(localStorage.getItem('token')!).subscribe((data) => {
        this.userInfo = data;
      });
    });
  }
  
  navigateToAddForm(): void {
    this.router.navigate(['/form']); // Adjust the route path as needed
  }
  
  // Add a method to handle sign-out
  signOut(): void {
    localStorage.clear();
    this.router.navigate(['/login-signup']);
  }
  
  deleteForm(form: formOverview) {
    const formId = form._id;
    if (form.isComplete) {
      const indexToRemove = this.completedForms.findIndex(item => item._id === form._id);
			this.completedForms.splice(indexToRemove, 1);
		} else {
      const indexToRemove = this.incompletedForms.findIndex(item => item._id === form._id);
			this.incompletedForms.splice(indexToRemove, 1);
		}
    this.userService.removeForm(formId).subscribe((data) => {
      console.log(data);
      //this.getForms();
    });
  }
  editForm(form: formOverview) {
    const formId = form._id;
    this.router.navigate(['/form', formId]);
  }
  viewForm(form: any) {
    this.selectedForm = form;
  }
  closeView() {
    this.selectedForm = undefined;
  }

  getClassLabels(classValue: string):string {
    var lables = this.userService.getClassLabels(classValue);
    return lables;
  }
}

