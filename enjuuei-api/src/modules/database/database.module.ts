import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Image } from 'src/entities/image.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { SeedService } from './service/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Category, Image, Order])],
  providers: [SeedService],
})
export class DatabaseModule {}
