import { PickType } from '@nestjs/mapped-types';
import { Category } from 'src/entities/category.entity';

class CategoryItemDto extends PickType(Category, [
  'id',
  'title',
  'description',
] as const) {}

export class ListAllCategoriesDto {
  categories: CategoryItemDto[];
}
