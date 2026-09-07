import { Test, TestingModule } from '@nestjs/testing';
import { IncompleteOrdersController } from './incomplete-orders.controller';
import { IncompleteOrdersService } from './incomplete-orders.service';

describe('IncompleteOrdersController', () => {
  let controller: IncompleteOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncompleteOrdersController],
      providers: [IncompleteOrdersService],
    }).compile();

    controller = module.get<IncompleteOrdersController>(IncompleteOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
