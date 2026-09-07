import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { CustomOrderStatus } from '../entities/custom-order.entity';

export class CreateCustomOrderDto {
  @IsNumber()
  userId: number;

  @IsString()
  category: string;

  @IsString()
  item: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsEnum(CustomOrderStatus)
  status?: CustomOrderStatus;

  @IsOptional()
  @IsNumber()
  price?: number;
}
