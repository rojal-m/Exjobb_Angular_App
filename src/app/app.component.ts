import { Component, OnInit } from '@angular/core';
import { formObject } from './formStructure';
import { Language } from './languageStructure';
// PATH TO YOUR JSON FILE
import data from '../data/form.json';
import lang from '../data/lang.json';


//import { plainToClass } from "class-transformer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'angular_app';
  
  selectedObject?: formObject;
  selectedLanguage!: string;
  
  // Parse JSON data into an instance of the class
  objectData: formObject[] = data;
  formLang: Language[] = lang;
  
  ngOnInit(){
    //console.log(this.objectData); // Outputs an instance of the Person class with data from the JSON file
    this.sortObjData();
    console.log(this.objectData); // Outputs an instance of the Person class with data from the JSON file
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    console.log(this.selectedLanguage);
  }

  selectObject(objectIndex: number) {
    console.log(objectIndex);
    this.selectedObject = this.objectData[objectIndex];
    console.log(this.selectedObject);
  }

  sortObjData(){
    this.objectData = this.objectData.sort(function (a, b) {
      return a.class.sortKey!.localeCompare(b.class.sortKey!);
    });
  }
}
