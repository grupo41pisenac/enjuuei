import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { IsPublic } from 'src/core/decorators/isPublic.decorator';
import * as Express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: Record<string, string>,
    @Response({ passthrough: true })
    res: Express.Response<any, Record<string, any>>,
  ) {
    return this.authService.login(
      { email: signInDto.username, password: signInDto.password },
      res,
    );
  }
}
