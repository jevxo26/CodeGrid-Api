import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { BlogStatus } from '../entities/blog.entity';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
