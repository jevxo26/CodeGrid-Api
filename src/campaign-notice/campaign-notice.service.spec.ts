import { Test, TestingModule } from '@nestjs/testing';
import { CampaignNoticeService } from './campaign-notice.service';

describe('CampaignNoticeService', () => {
  let service: CampaignNoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignNoticeService],
    }).compile();

    service = module.get<CampaignNoticeService>(CampaignNoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
