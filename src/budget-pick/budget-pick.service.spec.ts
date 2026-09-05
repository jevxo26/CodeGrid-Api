import { Test, TestingModule } from '@nestjs/testing';
import { BudgetPickService } from './budget-pick.service';

describe('BudgetPickService', () => {
  let service: BudgetPickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetPickService],
    }).compile();

    service = module.get<BudgetPickService>(BudgetPickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
