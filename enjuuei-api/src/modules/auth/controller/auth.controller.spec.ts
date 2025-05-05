import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from 'src/modules/user/service/user.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UserService],
    }).compile();

    authController = user.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authController.getHello()).toBe('Hello World!');
    });
  });
});
