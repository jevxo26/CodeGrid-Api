import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { BannerStatus } from '../entities/banner.entity';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;

  @IsOptional()
  @IsNumber()
  order?: number;
}
