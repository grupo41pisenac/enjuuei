import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ status: boolean; payload?: User; message?: string } | null> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { status: true, payload: user };
    } else {
      return { status: false, message: 'Invalid email or password!' };
    }
  }

  async login(loginDto: LoginDto, res: Response) {
    const validation = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (validation && !validation.status) {
      res.status(401).send(validation.message);
      return;
    }

    let payload: {
      sub: string;
      name: string;
      email: string;
    };

    if (validation?.payload) {
      payload = {
        sub: validation.payload.id,
        name: validation.payload.name,
        email: validation.payload.email,
      };

      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: '60m',
        secret: process.env.SECRET_KEY,
      });

      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
      });

      res.send({ success: true });
    } else {
      throw new UnauthorizedException();
    }
  }
}
