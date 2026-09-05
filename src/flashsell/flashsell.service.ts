import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateFlashsellDto } from './dto/create-flashsell.dto';
import { UpdateFlashsellDto } from './dto/update-flashsell.dto';
import { Flashsell } from './entities/flashsell.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class FlashsellService {
  constructor(
    @InjectRepository(Flashsell)
    private readonly flashsellRepository: Repository<Flashsell>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createFlashsellDto: CreateFlashsellDto): Promise<Flashsell> {
    const { productIds, ...rest } = createFlashsellDto;
    
    const flashsell = this.flashsellRepository.create({
      ...rest,
      products: productIds?.length ? productIds.map(id => ({ id })) : undefined,
    });
    
    const savedFlashsell = await this.flashsellRepository.save(flashsell);

    if (productIds?.length && createFlashsellDto.discountPercentage) {
      await this.applyDiscountToProducts(productIds, createFlashsellDto.discountPercentage);
    }

    return savedFlashsell;
  }

  async findAll(): Promise<Flashsell[]> {
    return await this.flashsellRepository.find({
      relations: {
        products: true,
      }
    });
  }

  async findOne(id: number): Promise<Flashsell> {
    const flashsell = await this.flashsellRepository.findOne({ 
      where: { id },
      relations: {
        products: true,
      }
    });
    
    if (!flashsell) {
      throw new NotFoundException(`Flashsell with ID ${id} not found`);
    }
    return flashsell;
  }

  async update(id: number, updateFlashsellDto: UpdateFlashsellDto): Promise<Flashsell> {
    const flashsell = await this.findOne(id);
    const { productIds, ...rest } = updateFlashsellDto;

    const updatedData: any = { ...rest };
    if (productIds !== undefined) {
      updatedData.products = productIds?.length ? productIds.map(pid => ({ id: pid })) : [];
    }

    const updatedFlashsell = this.flashsellRepository.merge(flashsell, updatedData);
    const savedFlashsell = await this.flashsellRepository.save(updatedFlashsell);

    const targetProductIds = productIds ?? flashsell.products?.map(p => p.id);
    const targetDiscount = updateFlashsellDto.discountPercentage ?? flashsell.discountPercentage;
    
    if (targetProductIds?.length && targetDiscount) {
      await this.applyDiscountToProducts(targetProductIds, targetDiscount);
    }

    return savedFlashsell;
  }

  async remove(id: number): Promise<void> {
    const flashsell = await this.findOne(id);
    await this.flashsellRepository.remove(flashsell);
  }

  private async applyDiscountToProducts(productIds: number[], discountPercentage: number) {
    const products = await this.productRepository.find({
      where: { id: In(productIds) }
    });

    for (const product of products) {
      const discountAmount = (product.originalPrice * discountPercentage) / 100;
      product.currentPrice = Number((product.originalPrice - discountAmount).toFixed(2));
    }

    await this.productRepository.save(products);
  }
}
