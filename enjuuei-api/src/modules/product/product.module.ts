import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Image } from 'src/entities/image.entity';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Category, Image, Order])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
