import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBlogDto: CreateBlogDto) {
    const data = await this.blogsService.create(createBlogDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Blog created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.blogsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Blogs retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.blogsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    const data = await this.blogsService.update(+id, updateBlogDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.blogsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog deleted successfully',
    };
  }
}
