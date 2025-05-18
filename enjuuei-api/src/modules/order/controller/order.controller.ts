/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { ListUserOrdersDto } from '../dto/response/listUserOrders.dto';
import { CreateOrderDto } from '../dto/request/createOrder.dto';
import { SuccessDto } from 'src/core/dto/success.dto';
import { IsPublic } from 'src/core/decorators/isPublic.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @IsPublic()
  @Get()
  listAll(@Request() req): Promise<ListUserOrdersDto> {
    return this.orderService.listUserOrders(req.user.email as string);
  }

  @IsPublic()
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
  ): Promise<SuccessDto> {
    return this.orderService.create(createOrderDto, req.user.email as string);
  }
}
