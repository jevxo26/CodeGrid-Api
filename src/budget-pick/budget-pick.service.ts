import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetPickDto } from './dto/create-budget-pick.dto';
import { UpdateBudgetPickDto } from './dto/update-budget-pick.dto';
import { BudgetPick } from './entities/budget-pick.entity';

@Injectable()
export class BudgetPickService {
  constructor(
    @InjectRepository(BudgetPick)
    private readonly budgetPickRepository: Repository<BudgetPick>,
  ) {}

  async create(createBudgetPickDto: CreateBudgetPickDto): Promise<BudgetPick> {
    const { productIds, ...rest } = createBudgetPickDto;
    
    const budgetPick = this.budgetPickRepository.create({
      ...rest,
      products: productIds?.length ? productIds.map(id => ({ id })) : undefined,
    });
    
    return await this.budgetPickRepository.save(budgetPick);
  }

  async findAll(): Promise<BudgetPick[]> {
    return await this.budgetPickRepository.find({
      relations: {
        products: true,
      }
    });
  }

  async findOne(id: number): Promise<BudgetPick> {
    const budgetPick = await this.budgetPickRepository.findOne({ 
      where: { id },
      relations: {
        products: true,
      }
    });
    
    if (!budgetPick) {
      throw new NotFoundException(`BudgetPick with ID ${id} not found`);
    }
    return budgetPick;
  }

  async update(id: number, updateBudgetPickDto: UpdateBudgetPickDto): Promise<BudgetPick> {
    const budgetPick = await this.findOne(id);
    const { productIds, ...rest } = updateBudgetPickDto;

    const updatedData: any = { ...rest };
    if (productIds !== undefined) {
      updatedData.products = productIds?.length ? productIds.map(id => ({ id })) : [];
    }

    const updatedBudgetPick = this.budgetPickRepository.merge(budgetPick, updatedData);
    return await this.budgetPickRepository.save(updatedBudgetPick);
  }

  async remove(id: number): Promise<void> {
    const budgetPick = await this.findOne(id);
    await this.budgetPickRepository.remove(budgetPick);
  }
}
