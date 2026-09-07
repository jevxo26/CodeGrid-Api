import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('customer-feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    const data = await this.feedbackService.create(createFeedbackDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Feedback logged successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.feedbackService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Feedback retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.feedbackService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Feedback retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    const data = await this.feedbackService.update(+id, updateFeedbackDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Feedback updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.feedbackService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Feedback deleted successfully',
    };
  }
}
