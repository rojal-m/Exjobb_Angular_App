export class formOverview {
    _id!: string;
    title!: string;
    isComplete!: Boolean;
    createdDate!: Date;
    userId!: string;
    class!: string;
    properties!: propertyOverview[];
}

export interface propertyOverview {
    name: string;
    value: string | string[];
}