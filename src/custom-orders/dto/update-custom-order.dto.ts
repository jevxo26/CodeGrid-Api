import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomOrderDto } from './create-custom-order.dto';

export class UpdateCustomOrderDto extends PartialType(CreateCustomOrderDto) {}
