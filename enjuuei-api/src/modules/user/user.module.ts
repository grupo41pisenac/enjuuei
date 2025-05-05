import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Order } from 'src/entities/order.entity';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Category, Image, Order])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
