import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ListAllProductsDto } from '../dto/response/listAllProducts.dto';
import { SuccessDto } from 'src/core/dto/success.dto';
import { CreateProductDto } from '../dto/request/createProduct.dto';
import { UpdateProductDto } from '../dto/request/updateProduct.dto';
import { Image } from 'src/entities/image.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

  async create(
    createProductDto: CreateProductDto,
    imageFiles: Express.Multer.File[],
  ): Promise<SuccessDto> {
    try {
      const category = await this.categoryRepository.findOneByOrFail({
        id: createProductDto.categoryId,
      });

      const product = this.productRepository.create({
        ...createProductDto,
        category,
      });

      if (imageFiles?.length) {
        const imageEntities = imageFiles.map((img) =>
          this.imageRepository.create({ source: `uploads/${img.filename}` }),
        );
        product.images = imageEntities;
      }

      await this.productRepository.save(product);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
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
