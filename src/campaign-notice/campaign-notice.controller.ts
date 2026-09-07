import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CampaignNoticeService } from './campaign-notice.service';
import { CreateCampaignNoticeDto } from './dto/create-campaign-notice.dto';
import { UpdateCampaignNoticeDto } from './dto/update-campaign-notice.dto';

@Controller('campaign-notice')
export class CampaignNoticeController {
  constructor(private readonly campaignNoticeService: CampaignNoticeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCampaignNoticeDto: CreateCampaignNoticeDto) {
    const data = await this.campaignNoticeService.create(createCampaignNoticeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Campaign notice created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.campaignNoticeService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notices retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.campaignNoticeService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCampaignNoticeDto: UpdateCampaignNoticeDto) {
    const data = await this.campaignNoticeService.update(+id, updateCampaignNoticeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.campaignNoticeService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice deleted successfully',
    };
  }
}
