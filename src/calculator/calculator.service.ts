import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalculatorDto } from './dto/create-calculator.dto';
import { UpdateCalculatorDto } from './dto/update-calculator.dto';
import { Calculator } from './entities/calculator.entity';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculator)
    private readonly calculatorRepository: Repository<Calculator>,
  ) {}

  async create(createCalculatorDto: CreateCalculatorDto): Promise<Calculator> {
    const calculation = this.calculatorRepository.create(createCalculatorDto);
    return await this.calculatorRepository.save(calculation);
  }

  async findAll(): Promise<Calculator[]> {
    return await this.calculatorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Calculator> {
    const calculation = await this.calculatorRepository.findOne({ where: { id } });
    if (!calculation) {
      throw new NotFoundException(`Calculation #${id} not found`);
    }
    return calculation;
  }

  async update(id: number, updateCalculatorDto: UpdateCalculatorDto): Promise<Calculator> {
    const calculation = await this.findOne(id);
    Object.assign(calculation, updateCalculatorDto);
    return await this.calculatorRepository.save(calculation);
  }

  async remove(id: number): Promise<void> {
    const calculation = await this.findOne(id);
    await this.calculatorRepository.remove(calculation);
  }
}
