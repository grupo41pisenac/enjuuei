import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../service/product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const product: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = product.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productController.getHello()).toBe('Hello World!');
    });
  });
});
