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
import { ListAllProductsDto } from '../dto/response/listAllProducts.dto';
import { CreateProductDto } from '../dto/request/createProduct.dto';
import { UpdateProductDto } from '../dto/request/updateProduct.dto';
import { SuccessDto } from 'src/core/dto/success.dto';
import { IsPublic } from 'src/core/decorators/isPublic.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @IsPublic()
  @Get()
  listAll(): Promise<ListAllProductsDto> {
    return this.productService.listAll();
  }

  @IsPublic()
  @Get(':id')
  detail(@Param('id') productId: string) {
    return this.productService.detail(productId);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<SuccessDto> {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') productId: string,
  ): Promise<SuccessDto> {
    return this.productService.update(updateProductDto, productId);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string): Promise<SuccessDto> {
    return this.productService.delete(productId);
  }
}
