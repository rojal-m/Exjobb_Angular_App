import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectLanguageComponent } from './form/select-language/select-language.component';
import { FormBuilderComponent } from './form/form-builder/form-builder.component';
import { SelectObjectComponent } from './form/select-object/select-object.component';
import { FormInputComponent } from './form/form-builder/form-input/form-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { OverviewComponent } from './overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { FormViewComponent } from './overview/form-view/form-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectLanguageComponent,
    FormBuilderComponent,
    SelectObjectComponent,
    FormInputComponent,
    FormComponent,
    LoginSignupComponent,
    OverviewComponent,
    FormViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
