import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCalculatorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  buyingPrice: number;

  @IsNumber()
  @Min(0)
  designCost: number;

  @IsNumber()
  @Min(0)
  additionalCost: number;

  @IsNumber()
  @Min(0)
  sellingPrice: number;
}
