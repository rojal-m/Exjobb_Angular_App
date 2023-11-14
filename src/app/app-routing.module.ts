import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { OverviewComponent } from './overview/overview.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login-signup', component: LoginSignupComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'form/:id', component: FormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login-signup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
