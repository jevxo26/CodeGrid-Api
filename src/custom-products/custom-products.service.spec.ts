import { Test, TestingModule } from '@nestjs/testing';
import { CustomProductsService } from './custom-products.service';

describe('CustomProductsService', () => {
  let service: CustomProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomProductsService],
    }).compile();

    service = module.get<CustomProductsService>(CustomProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
