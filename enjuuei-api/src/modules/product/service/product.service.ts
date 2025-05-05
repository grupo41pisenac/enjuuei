import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ListAllProductsDto } from '../dto/response/listAllProducts.dto';
import { SuccessDto } from 'src/core/dto/success.dto';
import { CreateProductDto } from '../dto/request/createProduct.dto';
import { UpdateProductDto } from '../dto/request/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async listAll(): Promise<ListAllProductsDto> {
    const products = await this.productRepository.find({
      relations: ['category', 'ownerUser', 'images'],
    });

    return {
      products,
    };
  }

  async detail(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category', 'ownerUser', 'images'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<SuccessDto> {
    try {
      const createdProduct = this.productRepository.create(createProductDto);

      await this.productRepository.save(createdProduct);
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }

  async update(
    updateProductDto: UpdateProductDto,
    id: string,
  ): Promise<SuccessDto> {
    try {
      await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }

  async delete(id: string): Promise<SuccessDto> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }
}
