import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = this.typeRepository.create(createTypeDto);
    return await this.typeRepository.save(type);
  }

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.findOne(id);
    const updatedType = this.typeRepository.merge(type, updateTypeDto);
    return await this.typeRepository.save(updatedType);
  }

  async remove(id: number): Promise<void> {
    const type = await this.findOne(id);
    await this.typeRepository.remove(type);
  }
}
