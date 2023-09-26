import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  // Create a FormGroup
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, perform actions here
      console.log(this.myForm.value);
    } else {
      // Form is invalid, display errors or take appropriate action
    }
  }
}
