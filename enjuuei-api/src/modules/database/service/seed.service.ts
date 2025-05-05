import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from 'src/core/enums/status.enum';
import { Category } from 'src/entities/category.entity';
import { Image } from 'src/entities/image.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async onApplicationBootstrap() {
    const exists = await this.categoryRepository.findOneBy({
      title: 'Eletrônicos',
    });
    if (!exists) {
      await this.seedCategories();
      await this.seedUsers();
      await this.seedProducts();
      console.log('Seed executado.');
    } else {
      console.log('Seed já executado.');
    }
  }

  async seedCategories() {
    const categories = [
      {
        title: 'Eletrônicos',
        description: 'Aparelhos eletrônicos em geral',
      },
      {
        title: 'Vestuário',
        description: 'Roupas, calçados e acessórios',
      },
      {
        title: 'Livros',
        description: 'Livros de todos os gêneros',
      },
    ];

    for (const categoryData of categories) {
      const existing = await this.categoryRepository.findOneBy({
        title: categoryData.title,
      });
      if (!existing) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
        console.log(`Categoria "${category.title}" criada.`);
      } else {
        console.log(`Categoria "${existing.title}" já existe.`);
      }
    }
  }

  async seedUsers() {
    const users: CreateUserDto[] = [
      {
        name: 'Carlos',
        lastName: 'Magno',
        document: '98765432100',
        email: 'carlos.magno@gmail.com',
        password: '789456',
        phone: '12987654123',
      },
    ];

    for (const userData of users) {
      const existing = await this.userRepository.findOneBy({
        email: userData.email,
      });
      if (!existing) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
        console.log(`Usuário "${user.name}" criado.`);
      } else {
        console.log(`Usuário "${existing.email}" já existe.`);
      }
    }
  }

  async seedProducts() {
    const ownerUser = await this.userRepository.findOneBy({});

    const category = await this.categoryRepository.findOneBy({});

    if (!ownerUser || !category) {
      console.error(
        'É necessário ter pelo menos um usuário e uma categoria no banco.',
      );
      return;
    }

    const productsData = [
      {
        title: 'Camisa Preta',
        description: 'Camisa básica preta tamanho M',
        price: 59.9,
        status: ProductStatus.AVAILABLE,
        ownerUser,
        categoryId: category.id,
        category,
        images: [
          this.imageRepository.create({
            source: 'uploads/camisa-preta.jpg',
          }),
        ],
      },
      {
        title: 'Tênis Branco',
        description: 'Tênis branco confortável para corrida',
        price: 199.99,
        status: ProductStatus.AVAILABLE,
        ownerUser,
        categoryId: category.id,
        category,
        images: [
          this.imageRepository.create({
            source: 'uploads/tenis-branco.jpg',
          }),
        ],
      },
    ];

    for (const data of productsData) {
      const product = this.productRepository.create(data);
      await this.productRepository.save(product);
      console.log(`Produto "${product.title}" criado com sucesso.`);
    }
  }
}
