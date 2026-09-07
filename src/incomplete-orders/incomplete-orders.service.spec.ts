import { Test, TestingModule } from '@nestjs/testing';
import { IncompleteOrdersService } from './incomplete-orders.service';

describe('IncompleteOrdersService', () => {
  let service: IncompleteOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncompleteOrdersService],
    }).compile();

    service = module.get<IncompleteOrdersService>(IncompleteOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
