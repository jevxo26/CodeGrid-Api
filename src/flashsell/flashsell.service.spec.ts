import { Test, TestingModule } from '@nestjs/testing';
import { FlashsellService } from './flashsell.service';

describe('FlashsellService', () => {
  let service: FlashsellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashsellService],
    }).compile();

    service = module.get<FlashsellService>(FlashsellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
