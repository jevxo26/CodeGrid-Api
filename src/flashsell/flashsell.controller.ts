import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FlashsellService } from './flashsell.service';
import { CreateFlashsellDto } from './dto/create-flashsell.dto';
import { UpdateFlashsellDto } from './dto/update-flashsell.dto';

@Controller('flashsell')
export class FlashsellController {
  constructor(private readonly flashsellService: FlashsellService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFlashsellDto: CreateFlashsellDto) {
    const data = await this.flashsellService.create(createFlashsellDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Flashsell created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.flashsellService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsells retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.flashsellService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateFlashsellDto: UpdateFlashsellDto) {
    const data = await this.flashsellService.update(+id, updateFlashsellDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.flashsellService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell deleted successfully',
    };
  }
}
