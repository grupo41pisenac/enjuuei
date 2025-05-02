import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor() {}

  @Get()
  listAll(): string {
    return 'Deve retornar a listagem de pedidos do usuário logado';
  }

  @Get(':id')
  detail(@Param('id') orderId: string) {
    console.log(orderId);
    return 'Deve retornar os dados de um pedido';
  }

  @Post()
  create(@Body() createOrderDto: string) {
    console.log(createOrderDto);
    return 'deve criar um pedido';
  }
}
