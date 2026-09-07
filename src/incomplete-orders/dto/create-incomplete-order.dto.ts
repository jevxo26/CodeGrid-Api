import { IsString, IsEmail, IsArray, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { IncompleteOrderStatus } from '../entities/incomplete-order.entity';

class IncompleteOrderProductDto {
  @IsOptional()
  productId?: number;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  @IsString()
  productName?: string;
}

export class CreateIncompleteOrderDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IncompleteOrderProductDto)
  selectedProducts?: IncompleteOrderProductDto[];

  @IsOptional()
  @IsEnum(IncompleteOrderStatus)
  status?: IncompleteOrderStatus;
}
