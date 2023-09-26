import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SelectObjectComponent } from './select-object/select-object.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectLanguageComponent,
    FormBuilderComponent,
    SelectObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
