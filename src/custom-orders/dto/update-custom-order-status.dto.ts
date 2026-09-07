import { IsEnum, IsNotEmpty } from 'class-validator';
import { CustomOrderStatus } from '../entities/custom-order.entity';

export class UpdateCustomOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(CustomOrderStatus)
  status: CustomOrderStatus;
}
