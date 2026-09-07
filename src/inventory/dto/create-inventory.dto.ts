import { IsString, IsNotEmpty, IsInt, IsEnum, Min, IsOptional } from 'class-validator';
import { InventoryStatus } from '../entities/inventory.entity';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsEnum(InventoryStatus)
  @IsOptional()
  status?: InventoryStatus;
}
