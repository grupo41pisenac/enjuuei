import { IsNumber, IsString } from '@nestjs/class-validator';
import { IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUUID()
  categoryId: string;
}
