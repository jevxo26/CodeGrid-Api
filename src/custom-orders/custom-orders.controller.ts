import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { UpdateCustomOrderStatusDto } from './dto/update-custom-order-status.dto';

@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private readonly customOrdersService: CustomOrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomOrderDto: CreateCustomOrderDto) {
    const data = await this.customOrdersService.create(createCustomOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Custom order created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.customOrdersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom orders retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.customOrdersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order retrieved successfully',
      data,
    };
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateCustomOrderStatusDto: UpdateCustomOrderStatusDto,
  ) {
    const data = await this.customOrdersService.updateStatus(
      +id,
      updateCustomOrderStatusDto.status,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order status updated successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCustomOrderDto: UpdateCustomOrderDto) {
    const data = await this.customOrdersService.update(+id, updateCustomOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.customOrdersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order deleted successfully',
    };
  }
}
