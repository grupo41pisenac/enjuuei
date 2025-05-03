import { DataSource } from 'typeorm';
import { Category } from '../../../entities/category.entity';
import { config } from 'dotenv';
import { Product } from '../../../entities/product.entity';
import { User } from '../../../entities/user.entity';
import { Order } from '../../../entities/order.entity';
import { Image } from '../../../entities/image.entity';

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

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Erro ao executar o seed:', err);
  process.exit(1);
});
