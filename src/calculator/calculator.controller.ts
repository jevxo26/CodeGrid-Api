import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CreateCalculatorDto } from './dto/create-calculator.dto';
import { UpdateCalculatorDto } from './dto/update-calculator.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  async create(@Body() createCalculatorDto: CreateCalculatorDto) {
    return await this.calculatorService.create(createCalculatorDto);
  }

  @Get()
  async findAll() {
    return await this.calculatorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.calculatorService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCalculatorDto: UpdateCalculatorDto) {
    return await this.calculatorService.update(+id, updateCalculatorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.calculatorService.remove(+id);
  }
}
