import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formObject, objProperty, labels } from '../formStructure';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit, OnChanges {
  @Input() object!: formObject;
  @Input() language!: string;
  //lang = this.language as keyof labels;
  
  @Output() objectSelect = new EventEmitter<number>();

  sortedProperties!: objProperty[];

  // Create a FormGroup
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.myForm = this.formBuilder.group({
      class: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['language']) {
      this.language = changes['language'].currentValue;
    }
    else if (changes['object']) {
      this.sortObjProp();
    }
    else {
      console.log(changes);
    }
  }
  ngOnInit(): void {
    this.sortObjProp();
  }

  handlePropertyChange(){
    console.log(this.myForm.value);
  }

  // Handle form submission
  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, perform actions here
      console.log(this.myForm);
    } else {
      // Form is invalid, display errors or take appropriate action
    }
  }

  sortObjProp(){
    this.sortedProperties = this.object.properties.sort(function (a, b) {
      return a.property.sortKey!.localeCompare(b.property.sortKey!);
    });
  }
}
