import { IsString, IsEmail, IsEnum, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';

class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  shippingAddress: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsNumber()
  totalAmount: number;
}
