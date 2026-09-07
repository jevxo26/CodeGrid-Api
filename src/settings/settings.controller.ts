import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.create(createSettingDto);
  }

  @Get()
  async findAll() {
    return await this.settingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.settingsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return await this.settingsService.update(+id, updateSettingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.settingsService.remove(+id);
  }
}
