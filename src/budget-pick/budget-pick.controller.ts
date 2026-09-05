import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetPickService } from './budget-pick.service';
import { CreateBudgetPickDto } from './dto/create-budget-pick.dto';
import { UpdateBudgetPickDto } from './dto/update-budget-pick.dto';

@Controller('budget-pick')
export class BudgetPickController {
  constructor(private readonly budgetPickService: BudgetPickService) {}

  @Post()
  create(@Body() createBudgetPickDto: CreateBudgetPickDto) {
    return this.budgetPickService.create(createBudgetPickDto);
  }

  @Get()
  findAll() {
    return this.budgetPickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetPickService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetPickDto: UpdateBudgetPickDto) {
    return this.budgetPickService.update(+id, updateBudgetPickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetPickService.remove(+id);
  }
}
