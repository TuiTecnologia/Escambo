import { IsArray, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpsertProfileDto {
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsInt()
  @Min(1)
  @Max(200)
  radiusMaxKm: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tradePreferences?: string[];
}
