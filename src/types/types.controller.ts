import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTypeDto: CreateTypeDto) {
    const data = await this.typesService.create(createTypeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Type created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.typesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Types retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.typesService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Type retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    const data = await this.typesService.update(+id, updateTypeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Type updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.typesService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Type deleted successfully',
    };
  }
}
