
export class formObject {
    class!: objClass;
    properties!: objProperty[];

    /* constructor(dataClass:objClass, dataProperties:objProperty[]){
        this.class = dataClass;
        this.properties = dataProperties;
    } */
}

export interface objClass {
    comments: lables; 
    sortKey?: string;
    value: string;
    labels: lables;
}
export interface objProperty {
    min:number;
    max?:number;
    datatype?:string;
    values?: objClass[];
    property:objClass;
}

export interface lables{
    default: string;
    en?: string;
    sv?: string;
    fr?: string;
    de?: string;
    se?: string;
}
