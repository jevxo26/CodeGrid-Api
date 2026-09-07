import { IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsOptional()
  storeName?: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  supportWhatsapp?: string;

  @IsString()
  @IsOptional()
  storeDescription?: string;

  @IsBoolean()
  @IsOptional()
  orderConfirmations?: boolean;

  @IsBoolean()
  @IsOptional()
  adminOrderAlerts?: boolean;

  @IsBoolean()
  @IsOptional()
  abandonedCartReminders?: boolean;
}
