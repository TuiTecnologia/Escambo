import { IsIn, IsString, Length } from 'class-validator';

export class VerifyCodeDto {
  @IsIn(['EMAIL', 'PHONE'])
  channel: 'EMAIL' | 'PHONE';

  @IsString()
  @Length(6, 6)
  code: string;
}
