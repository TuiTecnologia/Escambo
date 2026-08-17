import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';

const STATUSES = ['ACTIVE', 'PAUSED', 'TRADED'] as const;

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsOptional()
  @IsIn(STATUSES)
  status?: (typeof STATUSES)[number];
}
