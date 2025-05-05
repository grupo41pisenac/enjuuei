/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { IsPublic } from 'src/core/decorators/isPublic.decorator';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { ListAllProductsDto } from 'src/modules/product/dto/response/listAllProducts.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    if (!req.user) {
      console.log('No user found!');
      return {
        success: false,
      };
    }
    return this.userService.update(updateUserDto, req.user.email as string);
  }

  @Get('chart')
  async chart(@Request() req): Promise<ListAllProductsDto> {
    return this.userService.listUserChart(req.user.email as string);
  }
}
