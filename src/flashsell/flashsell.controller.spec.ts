import { Test, TestingModule } from '@nestjs/testing';
import { FlashsellController } from './flashsell.controller';
import { FlashsellService } from './flashsell.service';

describe('FlashsellController', () => {
  let controller: FlashsellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashsellController],
      providers: [FlashsellService],
    }).compile();

    controller = module.get<FlashsellController>(FlashsellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
