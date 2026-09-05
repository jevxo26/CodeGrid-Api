import { IsString, IsOptional } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
