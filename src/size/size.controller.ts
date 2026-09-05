import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSizeDto: CreateSizeDto) {
    const data = await this.sizeService.create(createSizeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Size created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.sizeService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Sizes retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.sizeService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Size retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    const data = await this.sizeService.update(+id, updateSizeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Size updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.sizeService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Size deleted successfully',
    };
  }
}
