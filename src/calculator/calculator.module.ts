import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { Calculator } from './entities/calculator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calculator])],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
