import { DataSource } from 'typeorm';
import { Category } from '../../../entities/category.entity';
import { config } from 'dotenv';
import { Product } from '../../../entities/product.entity';
import { User } from '../../../entities/user.entity';
import { Order } from '../../../entities/order.entity';
import { Image } from '../../../entities/image.entity';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { ProductStatus } from 'src/core/enums/status.enum';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Category, Product, User, Image, Order],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  await seedCategories();

  await seedUsers();

  await seedProducts();

  await AppDataSource.destroy();
}

async function seedCategories() {
  const categoryRepository = AppDataSource.getRepository(Category);

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
    const existing = await categoryRepository.findOneBy({
      title: categoryData.title,
    });
    if (!existing) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
      console.log(`Categoria "${category.title}" criada.`);
    } else {
      console.log(`Categoria "${existing.title}" já existe.`);
    }
  }
}

async function seedUsers() {
  const userRepository = AppDataSource.getRepository(User);

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
    const existing = await userRepository.findOneBy({
      email: userData.email,
    });
    if (!existing) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
      console.log(`Usuário "${user.name}" criado.`);
    } else {
      console.log(`Usuário "${existing.email}" já existe.`);
    }
  }
}

async function seedProducts() {
  const productRepository = AppDataSource.getRepository(Product);
  const imageRepository = AppDataSource.getRepository(Image);
  const userRepository = AppDataSource.getRepository(User);
  const categoryRepository = AppDataSource.getRepository(Category);

  const ownerUser = await userRepository.findOneBy({});

  const category = await categoryRepository.findOneBy({});

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
        imageRepository.create({
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
        imageRepository.create({
          source: 'uploads/tenis-branco.jpg',
        }),
      ],
    },
  ];

  for (const data of productsData) {
    const product = productRepository.create(data);
    await productRepository.save(product);
    console.log(`Produto "${product.title}" criado com sucesso.`);
  }
}

seed().catch((err) => {
  console.error('Erro ao executar o seed:', err);
  process.exit(1);
});
