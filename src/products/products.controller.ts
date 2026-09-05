import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productsService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const data = await this.productsService.update(+id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
