/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { ListUserOrdersDto } from '../dto/response/listUserOrders.dto';
import { Product } from 'src/entities/product.entity';
import { CreateOrderDto } from '../dto/request/createOrder.dto';
import { User } from 'src/entities/user.entity';
import { SuccessDto } from 'src/core/dto/success.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listUserOrders(email: string): Promise<ListUserOrdersDto> {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          email, 
        },
      },
    });

    return {
      orders,
    }
  }

  async create(createOrderDto: CreateOrderDto, email: string): Promise<SuccessDto> {
    const [user, products] = await Promise.all([
      this.userRepository.findOne({
        where: {
          email,
        },
      }), 
      this.productRepository.findBy({ 
        id: In(createOrderDto.products) 
      })
    ]);

    if (products.length !== createOrderDto.products.length) {
      throw new NotFoundException('Um ou mais produtos não foram encontrados.');
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    try {
      const order = this.orderRepository.create({
        products,
        user
      });
  
      await this.orderRepository.save(order);
    } catch (error) {
      console.error(error);
      return {
        success: false,
      }
    }

    return {
      success: true,
    }
  }
}
