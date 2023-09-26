import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formObject, labels } from '../formStructure';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.css']
})
export class SelectObjectComponent implements OnInit {
  @Input() objDatas!: formObject[];
  @Input() language!: string;
  lang = this.language as keyof labels;
  
  
  @Output() objectSelect = new EventEmitter<number>();


  objIndex!: number;

  
  onObjectChange(store: boolean){
    if (store){
      localStorage.setItem('objIndex', this.objIndex.toString());
    }
    this.objectSelect.emit(this.objIndex);
  }
  
  ngOnInit(): void {
    const storedObjIndex = localStorage.getItem('objIndex');
    if (storedObjIndex !== null) {
      this.objIndex = Number(storedObjIndex);
      this.onObjectChange(false);
    } else {
      this.objIndex = 0;
      this.onObjectChange(true);
    }
  }
}
