import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { formObject, labels } from '../../../model/formStructure';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectObjectComponent implements OnInit, OnChanges {
  
  @Input() objDatas!: formObject[];
  @Input() objClass?: string;
  @Input() language!: string;
  lang = this.language as keyof labels;
  objIndex!: number;

  @Output() objectSelect = new EventEmitter<number>();
  

  ngOnInit(): void {
    if(this.objClass){
      const index = this.objDatas.findIndex(item => item.class.value === this.objClass);
      this.objIndex = index;
    }
    else{
      this.objIndex = 0;
    }
    this.onObjectChange();
  }

  onObjectChange(){
    this.objectSelect.emit(this.objIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['language']) {
      this.language = this.language;
      this.lang = changes['language'].currentValue as keyof labels;
    }
    if(changes['objClass']) {
      const index = this.objDatas.findIndex(item => item.class.value === this.objClass);
      this.objIndex = index;
      this.onObjectChange();
    }
    else {
      console.log(changes);
    }
  }

  indent( sortKey:string ): string {
    // Split the sortKey string using '->' as the delimiter
    const arrowCount = sortKey.split('->').length - 1;

    // Create a string with the desired number of val characters
    const val = String.fromCharCode(8194).repeat(arrowCount);

    return val;
  }
}
