import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,  ViewChild, ElementRef  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formObject, objProperty } from '../../../model/formStructure';
import { formOverview } from '../../../model/formOverview';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit, OnChanges {
  @ViewChild('myForm') myForm!: ElementRef; // Use ElementRef for ElementRef-based access

  @Input() currentForm?: formOverview;
  @Input() object!: formObject;
  @Input() language!: string;
  @Input() editing!: Boolean;

  sortedProperties!: objProperty[];

  // Create a FormGroup
  objForm: FormGroup;
  objFormProp!: FormArray<FormGroup>;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.objForm = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      class: this.formBuilder.control(''),
      isComplete: this.formBuilder.control(''),
      userId: this.formBuilder.control(''),
      properties: this.formBuilder.array<FormGroup>([]),
    });
    console.log("Form Builder Constructor")
  }
  ngOnInit(): void {
    this.sortObjProp();
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['language']) {
      this.language = changes['language'].currentValue;
    }
    if (changes['object'] && this.object) {
      this.sortObjProp();
      this.resetForm();
    }
    if (changes['currentForm'] && this.currentForm != null) {
      this.objForm.get('title')?.setValue(this.currentForm!.title);
      this.objForm.get('isComplete')?.setValue(this.currentForm!.isComplete);
      const propertiesWithoutId = this.currentForm!.properties.map(property => this.excludeProperties(property, ['_id']));
      this.objForm.get('properties')?.setValue(propertiesWithoutId);
      
    }
    console.log(changes);
  }
  excludeProperties(obj: any, excludedProperties: string[]): any {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !excludedProperties.includes(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  sortObjProp(){
    this.sortedProperties = this.object.properties.sort(function (a, b) {
      return a.property.sortKey!.localeCompare(b.property.sortKey!);
    });
  }

  resetForm() {
    this.objForm.reset(); // Reset the form group
    // Reset the form array by clearing its controls
    const objFormProp = this.objForm.get('properties') as FormArray;
    while (objFormProp.length > 0) {
      objFormProp.removeAt(0);
    }
    this.addProperties();
    this.objForm.get('class')?.setValue(this.object.class.value);
    this.objForm.get('userId')?.setValue(localStorage.getItem('token'));
    this.objForm.get('isComplete')?.setValue(false);
  }

  addProperties(){
    this.objFormProp = this.objForm.get('properties') as FormArray;
    for (const prop of this.sortedProperties) {
      //const type = prop.property.value as keyof FormGroup;
      if (prop.min != 0) {
        this.objFormProp.push(this.formBuilder.group({ name: prop.property.value , value : this.formBuilder.control('', Validators.required)}));
      } else {
        this.objFormProp.push(this.formBuilder.group({ name: prop.property.value , value : this.formBuilder.control('')}));
      }
    }
  }

  // Handle form submission
  onSubmit(event: Event) {
    if (this.objForm.valid) {
      // Form is valid
      this.objForm.get('isComplete')?.setValue(true);
    } else {
      // Form is invalid
      this.objForm.get('isComplete')?.setValue(false);
    }
    const formData = this.objForm.value;
    console.log(formData)
    if (this.editing) {
      this.userService.patchForm(this.currentForm!._id ,formData).subscribe({
        next: (response) => {
          // Handle successful signup
          const resp: formOverview =  response;
          console.log("Post sucess");
          console.log(resp);
          this.router.navigate(['/overview']);
        },
        error: (error) => {
          // Handle signup error
          console.error('Signup failed:', error);
        }});
    }
    else{
      this.userService.postForm(formData).subscribe({
      next: (response) => {
        // Handle successful signup
        const resp: formOverview =  response;
        console.log("Post sucess");
        console.log(resp);
        this.router.navigate(['/overview']);
      },
      error: (error) => {
        // Handle signup error
        console.error('Signup failed:', error);
      }});
    }
    }
  }