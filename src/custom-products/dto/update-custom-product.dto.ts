import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomProductDto } from './create-custom-product.dto';

export class UpdateCustomProductDto extends PartialType(CreateCustomProductDto) {}
