import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  async findAll(): Promise<Size[]> {
    return await this.sizeRepository.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }
    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(id);
    const updatedSize = this.sizeRepository.merge(size, updateSizeDto);
    return await this.sizeRepository.save(updatedSize);
  }

  async remove(id: number): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.remove(size);
  }
}
