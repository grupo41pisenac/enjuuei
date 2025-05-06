import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
