import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { UpdateCustomProductDto } from './dto/update-custom-product.dto';
import { CustomProduct } from './entities/custom-product.entity';

@Injectable()
export class CustomProductsService {
  constructor(
    @InjectRepository(CustomProduct)
    private readonly customProductRepository: Repository<CustomProduct>,
  ) {}

  async create(createCustomProductDto: CreateCustomProductDto): Promise<CustomProduct> {
    const product = this.customProductRepository.create(createCustomProductDto);
    return await this.customProductRepository.save(product);
  }

  async findAll(): Promise<CustomProduct[]> {
    return await this.customProductRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CustomProduct> {
    const product = await this.customProductRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Custom Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateCustomProductDto: UpdateCustomProductDto): Promise<CustomProduct> {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, updateCustomProductDto);
    return await this.customProductRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.customProductRepository.remove(product);
  }
}
