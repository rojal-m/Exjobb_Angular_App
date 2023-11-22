import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Language } from '../../../model/languageStructure';
import lang from '../../../data/lang.json';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css'],
})
export class SelectLanguageComponent implements OnInit {
  
  languages: Language[] = lang;

  @Output() languageChange = new EventEmitter<string>();

  selectedLanguage!: Language;

  langIndex!: number;

  onLanguageChange(store: boolean) {
    if (store){
      localStorage.setItem('langIndex', this.langIndex.toString());
    }
    this.selectedLanguage = this.languages[this.langIndex];
    this.languageChange.emit(this.selectedLanguage.value);
  }

  ngOnInit() {
    const storedLangIndex = localStorage.getItem('langIndex');
    if (storedLangIndex !== null) {
      this.langIndex = Number(storedLangIndex);
      this.onLanguageChange(false);
    } else {
      this.langIndex = 0;
      this.onLanguageChange(true);
    }
  }
}
