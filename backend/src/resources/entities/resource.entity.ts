import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ResourceCondition{
    LOCKED='LOCKED',
    USABLE='USABLE',
    BROKEN='BROKEN'
}

export enum ResourceType{
    ROOM='ROOM',
    OBJECT='OBJECT'
}

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    name:string;

    @Column({length:100})
    category:string;

    @Column({type:'text',nullable:true})
    description:string;

    @Column({length:50})
    location:string;

    @Column({default:30})
    timeGranularity:number;

    @Column({default:240})
    maxBookingDuration:number;

    @Column({type:'text',nullable:true})
    bookingConstraints:string

    @Column({
        type:'enum',
        enum:ResourceCondition,
        default:ResourceCondition.USABLE
    })
    condition:ResourceCondition;

    @Column({
        type:'enum',
        enum:ResourceType,
        default:ResourceType.ROOM
    })
    type:ResourceType;

    @Column({type:'json',nullable:true})
    images:string[]
    
    @Column({default:true})
    isAvailable:boolean;
    
    @Column({default:false})
    isArchived:boolean;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    
}
