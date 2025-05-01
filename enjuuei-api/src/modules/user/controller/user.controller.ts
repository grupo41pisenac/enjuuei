import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello') //Apenas para teste em dev. Remover
  getHello(): string {
    return this.userService.getHello();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
