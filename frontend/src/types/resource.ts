export type ResourceCondition='LOCKED' | 'USABLE' | 'BROKEN';

export type ResourceType='ROOM' | 'OBJECT';

export interface Resource{
    id:number,
    name:string,
    category:string,
    description:string | null,
    location:string,
    timeGranularity:number,
    maxBookingDuration:number,
    bookingConstraints:string | null,
    condition:ResourceCondition | null,
    type:ResourceType,
    images:string[] | null,
    isAvailable:boolean,
    isArchived:boolean,
    createdAt:string,
    updatedAt:string
}

export interface CreateResourcePayload{
     name:string,
     description?:string,
     category:string,
     location:string,
     timeGranularity?:number,
     maxBookingDuration?:number,
     bookingConstraints?:string,
     condition?:ResourceCondition,
     type?:ResourceType,
     images?:string[],
     isAvailable?:boolean
}
export type UpdateResourcePayload=Partial<CreateResourcePayload>;