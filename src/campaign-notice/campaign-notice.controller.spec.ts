import { Test, TestingModule } from '@nestjs/testing';
import { CampaignNoticeController } from './campaign-notice.controller';
import { CampaignNoticeService } from './campaign-notice.service';

describe('CampaignNoticeController', () => {
  let controller: CampaignNoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignNoticeController],
      providers: [CampaignNoticeService],
    }).compile();

    controller = module.get<CampaignNoticeController>(CampaignNoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
