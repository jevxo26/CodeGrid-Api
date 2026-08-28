import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory> {
    const subCategory = this.subCategoryRepository.create({
      name: createSubCategoryDto.name,
      description: createSubCategoryDto.description,
      parentCategory: { id: createSubCategoryDto.parentCategoryId }
    });
    try {
      return await this.subCategoryRepository.save(subCategory);
    } catch (error) {
      throw new InternalServerErrorException('Error creating sub-category');
    }
  }

  async findAll(): Promise<SubCategory[]> {
    return await this.subCategoryRepository.find({ relations: { parentCategory: true } });
  }

  async findOne(id: number): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.findOne({ 
      where: { id },
      relations: { parentCategory: true }
    });
    if (!subCategory) {
      throw new NotFoundException(`Sub-category with ID ${id} not found`);
    }
    return subCategory;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory> {
    const subCategory = await this.findOne(id);
    
    if (updateSubCategoryDto.name) subCategory.name = updateSubCategoryDto.name;
    if (updateSubCategoryDto.description) subCategory.description = updateSubCategoryDto.description;
    if (updateSubCategoryDto.parentCategoryId) {
      subCategory.parentCategory = { id: updateSubCategoryDto.parentCategoryId } as any;
    }
    
    try {
      return await this.subCategoryRepository.save(subCategory);
    } catch (error) {
      throw new InternalServerErrorException('Error updating sub-category');
    }
  }

  async remove(id: number): Promise<void> {
    const subCategory = await this.findOne(id);
    await this.subCategoryRepository.remove(subCategory);
  }
}
