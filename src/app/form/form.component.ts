import { Component, OnInit } from '@angular/core';
import { formObject } from '../../model/formStructure';
import { Language } from '../../model/languageStructure';
import { formOverview } from '../../model/formOverview';
// PATH TO YOUR JSON FILE
import data from '../../data/form.json';
import lang from '../../data/lang.json';
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
  objectData: formObject[] = data;
  formLang: Language[] = lang;


  constructor(private route: ActivatedRoute, private userService: UserService) {}
  
  ngOnInit(){
    this.route.params.subscribe((params) =>  {
      const id = params['id'];
      if(id){
        this.editing = true;
        this.getOneForm(params['id']);
      }
    });
    this.sortObjData();
  }
  getOneForm(formId: string) {
    this.userService.getOneForm(formId).subscribe((data) => {
      this.currentForm = data;
    });
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  selectObject(objectIndex: number) {
    this.selectedObject = this.objectData[objectIndex];
  }

  sortObjData(){
    this.objectData = this.objectData.sort(function (a, b) {
      return a.class.sortKey!.localeCompare(b.class.sortKey!);
    });
  }
}
