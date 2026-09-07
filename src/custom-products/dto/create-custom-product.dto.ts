import { IsString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomProductCategory, CustomProductStatus } from '../entities/custom-product.entity';

class PackageItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class CreateCustomProductDto {
  @IsString()
  productName: string;

  @IsEnum(CustomProductCategory)
  category: CustomProductCategory;

  @IsString()
  price: string;

  @IsEnum(CustomProductStatus)
  status: CustomProductStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageItemDto)
  packageItems?: PackageItemDto[];
}
