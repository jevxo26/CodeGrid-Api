import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { IncompleteOrdersService } from './incomplete-orders.service';
import { CreateIncompleteOrderDto } from './dto/create-incomplete-order.dto';
import { UpdateIncompleteOrderDto } from './dto/update-incomplete-order.dto';

@Controller('incomplete-orders')
export class IncompleteOrdersController {
  constructor(private readonly incompleteOrdersService: IncompleteOrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIncompleteOrderDto: CreateIncompleteOrderDto) {
    const data = await this.incompleteOrdersService.create(createIncompleteOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Incomplete order logged successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.incompleteOrdersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Incomplete orders retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.incompleteOrdersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Incomplete order retrieved successfully',
      data,
    };
  }

  @Post(':id/send-email')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Param('id') id: string) {
    const data = await this.incompleteOrdersService.triggerAbandonedCartEmail(+id);
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateIncompleteOrderDto: UpdateIncompleteOrderDto) {
    const data = await this.incompleteOrdersService.update(+id, updateIncompleteOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Incomplete order updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.incompleteOrdersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Incomplete order deleted successfully',
    };
  }
}
