import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  listAll(): string {
    return 'Deve retornar a listagem de produtos';
  }

  @Get(':id')
  detail(@Param('id') productId: string) {
    console.log(productId);
    return 'Deve retornar os dados de um produto';
  }

  @Post()
  create(@Body() createProductDto: string) {
    console.log(createProductDto);
    return 'deve criar um produto';
  }

  @Patch(':id')
  update(@Body() updateProductDto: string, @Param('id') productId: string) {
    console.log(productId);
    console.log(updateProductDto);
    return 'deve atualizar um produto';
  }

  @Delete(':id')
  deleteProduct() {
    return 'deve alterar status de um produto para inativo';
  }
}
