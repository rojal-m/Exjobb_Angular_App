import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { formOverview, propertyOverview } from 'src/model/formOverview';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit, OnDestroy {
  @Input() form!: formOverview; // Input property to receive the form data
  @Output() close = new EventEmitter();
  
  constructor(private userService: UserService){
    console.log("view created");
  }
  ngOnInit(): void {
    this.getOneForm(this.form._id)
  }
  
  getOneForm(formId: string) {
    this.userService.getOneForm(formId).subscribe((data) => {
      this.form = data;
      console.log(this.form);
    });
  }
  getClassLabels(classValue: string):string {
    var lables = this.userService.getClassLabels(classValue);
    return lables;
  }
  
  getPropertyDisplayLabel(property: string): string {
    return this.userService.getPropertyLabels(this.form.class, property); 
  }
  getPropertyDisplayValue(property: propertyOverview): string {
    if (Array.isArray(property.value)) {
      // Handle the array case (for example, concatenate labels or join them in some way)
      return property.value.map(p => this.userService.getPropertyValueLabels(this.form.class,property.name,  p)).join(', ');
    }
    return this.userService.getPropertyLabels(this.form.class, property.value); 
  }
  
  download() {
    // Convert form data to JSON format
    const formData:any = this.form;
    delete formData["__v"];
    delete formData["_id"];
    delete formData["isComplete"];
    delete formData["userId"];
    delete formData["createdDate"];
    const jsonData = JSON.stringify(this.form);

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
  }
  
  closeView() {
    this.close.emit();
  }
  
  ngOnDestroy(): void {
    console.log("view destroyed");
  }
}
