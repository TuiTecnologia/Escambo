import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

const CONDITIONS = ['NEW', 'LIKE_NEW', 'USED_GOOD', 'USED_FAIR'] as const;
const DELIVERY_METHODS = ['PICKUP', 'SHIPPING', 'BOTH'] as const;

export class CreateListingDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  categoryId: string;

  @IsIn(CONDITIONS)
  condition: (typeof CONDITIONS)[number];

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  estimatedValue: number;

  @IsOptional()
  @IsBoolean()
  acceptsOtherProposals?: boolean;

  @IsOptional()
  @IsString()
  availability?: string;

  @IsIn(DELIVERY_METHODS)
  deliveryMethod: (typeof DELIVERY_METHODS)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  radiusMaxKm?: number;

  @IsOptional()
  @IsString()
  desiredDescription?: string;
}
