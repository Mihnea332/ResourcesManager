import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepo:Repository<Resource>
  )
  {}
  async create(createResourceDto:CreateResourceDto):Promise<Resource>{
    const resource=this.resourceRepo.create(createResourceDto);
    return await this.resourceRepo.save(resource);
  }

  async findAll():Promise<Resource[]>{
    return await this.resourceRepo.find({where:{
      isArchived:false
    }});
  }

  async findOne(id:number):Promise<Resource>
  {
    const resource=await this.resourceRepo.findOneBy({id});
    if (!resource)
    {
      throw new NotFoundException(`Resource with ID ${id} not found`)
    }
    return resource;
  }

  async update(id:number,updateResourceDto:UpdateResourceDto):Promise<Resource>{
    const resource=await this.findOne(id);
    Object.assign(resource,updateResourceDto);
    return await this.resourceRepo.save(resource);
  }

  async archive(id:number):Promise<Resource>{
    const resource=await this.findOne(id)
    resource.isArchived=true;
    return await this.resourceRepo.save(resource)
  }
}
