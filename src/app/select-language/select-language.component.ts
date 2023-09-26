import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Language } from '../languageStructure';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css'],
})
export class SelectLanguageComponent implements OnInit {
  @Input() languages!: Language[];

  @Output() languageChange = new EventEmitter<string>();

  selectedLanguage!: Language;

  langIndex!: number;

  onLanguageChange() {
    localStorage.setItem('langIndex', this.langIndex.toString());

    this.selectedLanguage = this.languages[this.langIndex];
    this.languageChange.emit(this.selectedLanguage.value);
  }

  ngOnInit(): void {
    const storedindex = localStorage.getItem('langIndex');
    if (storedindex !== null) {
      this.langIndex = Number(storedindex);
    } else {
      this.langIndex = 0;
      localStorage.setItem('langIndex', this.langIndex.toString());
    }
    this.selectedLanguage = this.languages[this.langIndex];
    this.languageChange.emit(this.selectedLanguage.value);
  }
}
