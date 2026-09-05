import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBudgetPickDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  packagePrice: number;

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
