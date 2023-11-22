import { Component, OnInit } from '@angular/core';
import { formObject } from '../../model/formStructure';
import { formOverview } from '../../model/formOverview';

import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


//import { plainToClass } from "class-transformer";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {
  
  selectedObject?: formObject;
  selectedLanguage!: string;
  currentForm?: formOverview;
  editing: Boolean = false;
  
  // Parse JSON data into an instance of the class

  constructor(private route: ActivatedRoute, private userService: UserService) {}
  
  ngOnInit(){
    this.route.params.subscribe((params) =>  {
      const id = params['id'];
      if(id){
        this.editing = true;
        this.getOneForm(params['id']);
      }
    });
  }
  getOneForm(formId: string) {
    this.userService.getOneForm(formId).subscribe((data) => {
      this.currentForm = data;
    });
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  selectObject(object: formObject) {
    this.selectedObject = object;
  }
}
