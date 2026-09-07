import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CustomProductsService } from './custom-products.service';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { UpdateCustomProductDto } from './dto/update-custom-product.dto';

@Controller('custom-products')
export class CustomProductsController {
  constructor(private readonly customProductsService: CustomProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomProductDto: CreateCustomProductDto) {
    const data = await this.customProductsService.create(createCustomProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Custom product created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.customProductsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom products retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.customProductsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom product retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCustomProductDto: UpdateCustomProductDto) {
    const data = await this.customProductsService.update(+id, updateCustomProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom product updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.customProductsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom product deleted successfully',
    };
  }
}
