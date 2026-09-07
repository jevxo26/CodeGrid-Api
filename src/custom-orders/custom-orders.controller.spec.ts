import { Test, TestingModule } from '@nestjs/testing';
import { CustomOrdersController } from './custom-orders.controller';
import { CustomOrdersService } from './custom-orders.service';

describe('CustomOrdersController', () => {
  let controller: CustomOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomOrdersController],
      providers: [CustomOrdersService],
    }).compile();

    controller = module.get<CustomOrdersController>(CustomOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
