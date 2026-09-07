import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignNoticeDto } from './create-campaign-notice.dto';

export class UpdateCampaignNoticeDto extends PartialType(CreateCampaignNoticeDto) {}
