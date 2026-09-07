import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignNoticeDto } from './dto/create-campaign-notice.dto';
import { UpdateCampaignNoticeDto } from './dto/update-campaign-notice.dto';
import { CampaignNotice } from './entities/campaign-notice.entity';

@Injectable()
export class CampaignNoticeService {
  constructor(
    @InjectRepository(CampaignNotice)
    private readonly campaignNoticeRepository: Repository<CampaignNotice>,
  ) {}

  async create(createCampaignNoticeDto: CreateCampaignNoticeDto): Promise<CampaignNotice> {
    const notice = this.campaignNoticeRepository.create(createCampaignNoticeDto);
    return await this.campaignNoticeRepository.save(notice);
  }

  async findAll(): Promise<CampaignNotice[]> {
    return await this.campaignNoticeRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CampaignNotice> {
    const notice = await this.campaignNoticeRepository.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException(`Campaign Notice #${id} not found`);
    }
    return notice;
  }

  async update(id: number, updateCampaignNoticeDto: UpdateCampaignNoticeDto): Promise<CampaignNotice> {
    const notice = await this.findOne(id);
    Object.assign(notice, updateCampaignNoticeDto);
    return await this.campaignNoticeRepository.save(notice);
  }

  async remove(id: number): Promise<void> {
    const notice = await this.findOne(id);
    await this.campaignNoticeRepository.remove(notice);
  }
}
