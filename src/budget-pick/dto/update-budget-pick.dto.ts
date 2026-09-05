import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetPickDto } from './create-budget-pick.dto';

export class UpdateBudgetPickDto extends PartialType(CreateBudgetPickDto) {}
