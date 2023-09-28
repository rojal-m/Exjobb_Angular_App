import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { formObject, labels } from '../formStructure';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectObjectComponent implements OnInit, OnChanges {
  
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
  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['language']) {
      this.language = this.language;
      this.lang = changes['language'].currentValue as keyof labels;
    }
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
