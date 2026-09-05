import { Test, TestingModule } from '@nestjs/testing';
import { BudgetPickController } from './budget-pick.controller';
import { BudgetPickService } from './budget-pick.service';

describe('BudgetPickController', () => {
  let controller: BudgetPickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetPickController],
      providers: [BudgetPickService],
    }).compile();

    controller = module.get<BudgetPickController>(BudgetPickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
