import { IsBoolean } from '@nestjs/class-validator';

export class SuccessDto {
  @IsBoolean()
  success: boolean;
}
