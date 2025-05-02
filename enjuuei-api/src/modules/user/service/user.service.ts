import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessDto } from 'src/core/dto/success.dto';
import { UserStatus } from 'src/core/enums/status.enum';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: username,
        status: UserStatus.ACTIVE,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<SuccessDto> {
    const exists = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (exists) {
      return {
        success: false,
      };
    }

    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  }
}
