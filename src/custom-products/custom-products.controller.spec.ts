import { Test, TestingModule } from '@nestjs/testing';
import { CustomProductsController } from './custom-products.controller';
import { CustomProductsService } from './custom-products.service';

describe('CustomProductsController', () => {
  let controller: CustomProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomProductsController],
      providers: [CustomProductsService],
    }).compile();

    controller = module.get<CustomProductsController>(CustomProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
