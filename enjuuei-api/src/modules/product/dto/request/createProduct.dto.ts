import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  images: Array<any>;

  @IsString()
  categoryId: string;
}
