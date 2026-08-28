import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  parentCategoryId: number;
}
