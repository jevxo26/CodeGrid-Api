import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const data = await this.subCategoryService.create(createSubCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Sub-category created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.subCategoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Sub-categories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.subCategoryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sub-category retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string, 
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ) {
    const data = await this.subCategoryService.update(+id, updateSubCategoryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sub-category updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.subCategoryService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sub-category deleted successfully',
    };
  }
}
