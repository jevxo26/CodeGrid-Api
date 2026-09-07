import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { FeedbackStatus } from '../entities/feedback.entity';

export class CreateFeedbackDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;
}
