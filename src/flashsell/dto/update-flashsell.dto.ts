import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashsellDto } from './create-flashsell.dto';

export class UpdateFlashsellDto extends PartialType(CreateFlashsellDto) {}
