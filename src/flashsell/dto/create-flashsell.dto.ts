import { IsString, IsNumber, IsOptional, IsBoolean, IsDateString, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlashsellDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discountPercentage?: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Type(() => Number)
  productIds?: number[];
}
