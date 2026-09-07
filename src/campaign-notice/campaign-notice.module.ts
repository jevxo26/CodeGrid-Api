import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignNoticeService } from './campaign-notice.service';
import { CampaignNoticeController } from './campaign-notice.controller';
import { CampaignNotice } from './entities/campaign-notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignNotice])],
  controllers: [CampaignNoticeController],
  providers: [CampaignNoticeService],
})
export class CampaignNoticeModule {}
