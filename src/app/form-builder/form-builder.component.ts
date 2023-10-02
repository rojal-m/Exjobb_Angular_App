import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  objForm: FormGroup;
  objFormProp!: FormArray<FormGroup>;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.objForm = this.formBuilder.group({
      class: this.formBuilder.control(''),
      properties: this.formBuilder.array<FormGroup>([]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['language']) {
      this.language = changes['language'].currentValue;
    }
    else if (changes['object']) {
      this.sortObjProp();
      this.resetForm();
      this.objForm.get('class')?.setValue(this.object.class.value);
      this.addProperties();
    }
    else {
      console.log(changes);
    }
  }
  ngOnInit(): void {
    this.sortObjProp();
    this.resetForm();
    this.objForm.get('class')?.setValue(this.object.class.value);
    this.addProperties();
  }

  handlePropertyChange(){
    //prop:FormGroup
    //this.objForm.get('properties')?.setValue([...this.objForm.get('properties')? , prop]);
    console.log(this.objForm.value);
  }

  // Handle form submission
  onSubmit() {
    if (this.objForm.valid) {
      // Form is valid, perform actions here
      // Get the form data from the FormGroup
      const formData = this.objForm.value;

      // Convert form data to JSON format
      const jsonData = JSON.stringify(formData);

      // Create a Blob with the JSON data
      const jsonBlob = new Blob([jsonData], { type: 'application/json' });

      const url = window.URL.createObjectURL(jsonBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      // Trigger the download
      a.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
    } else {
      // Form is invalid, display errors or take appropriate action
      console.log("Form Not valid")
      console.log(this.objForm);
    }
  }

  sortObjProp(){
    this.sortedProperties = this.object.properties.sort(function (a, b) {
      return a.property.sortKey!.localeCompare(b.property.sortKey!);
    });
  }

  addProperties(){
    this.objFormProp = this.objForm.get('properties') as FormArray;
    for (const prop of this.sortedProperties) {
      //const type = prop.property.value as keyof FormGroup;
      this.objFormProp.push(this.formBuilder.group({ name: prop.property.value , value : this.formBuilder.control('')}));
      //console.log(prop.property.);
    }
  }
  resetForm() {
    this.objForm.reset(); // Reset the form group

    // Reset the form array by clearing its controls
    const objFormProp = this.objForm.get('properties') as FormArray;
    while (objFormProp.length > 0) {
      objFormProp.removeAt(0);
    }
  }
}
