import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetPickService } from './budget-pick.service';
import { BudgetPickController } from './budget-pick.controller';
import { BudgetPick } from './entities/budget-pick.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetPick])],
  controllers: [BudgetPickController],
  providers: [BudgetPickService],
})
export class BudgetPickModule {}
