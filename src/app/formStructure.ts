
export class formObject {
    class!: objClass;
    properties!: objProperty[];

    /* constructor(dataClass:objClass, dataProperties:objProperty[]){
        this.class = dataClass;
        this.properties = dataProperties;
    } */
}

export interface objClass {
    comments: labels; 
    sortKey?: string;
    value: string;
    labels: labels;
}
export interface objProperty {
    min:number;
    max?:number;
    datatype?:string;
    values?: objClass[];
    property:objClass;
}

export interface labels{
    default: string;
    en?: string;
    sv?: string;
    fr?: string;
    de?: string;
    se?: string;

}
