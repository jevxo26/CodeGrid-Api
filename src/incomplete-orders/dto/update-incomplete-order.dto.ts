import { PartialType } from '@nestjs/mapped-types';
import { CreateIncompleteOrderDto } from './create-incomplete-order.dto';

export class UpdateIncompleteOrderDto extends PartialType(CreateIncompleteOrderDto) {}
