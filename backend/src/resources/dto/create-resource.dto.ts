import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ResourceCondition, ResourceType } from '../entities/resource.entity';
export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsString()
    @IsNotEmpty()
    category:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    location:string

    @IsOptional()
    @IsNumber()
    @Min(30)
    timeGranularity?:number;

    @IsOptional()
    @IsNumber()
    @Min(30)
    maxBookingDuration?:number;

    @IsOptional()
    @IsString()
    bookingConstraints?:string;

    @IsOptional()
    @IsEnum(ResourceCondition)
    condition?:ResourceCondition;

    @IsOptional()
    @IsEnum(ResourceType)
    type?:ResourceType

    @IsOptional()
    @IsArray()
    @IsString({each:true})
    images?:string[]

    @IsOptional()
    @IsBoolean()
    isAvailable?:boolean;

    
}
