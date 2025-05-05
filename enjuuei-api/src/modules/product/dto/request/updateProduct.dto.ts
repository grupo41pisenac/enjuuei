import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

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

  @IsOptional()
  images?: Array<any>;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
