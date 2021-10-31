import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  public constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get()
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':categoryId/cars')
  public async getAllCarOfCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Car[]> {
    return this.categoryService.getAllCarOfCategory(categoryId);
  }

  @Delete(':categoryId/delete')
  public async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Category[]> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Post(':categoryId/edit')
  public editCategory(
    @Body() category: Category,
    @Param('categoryId') categoryId: number,
  ): Promise<Category> {
    return this.categoryService.createUpdateCategory(category);
  }

  @Post()
  public createCategory(
    @Body() category: Category,
    @Param('categoryId') categoryId: number,
  ): Promise<Category> {
    return this.categoryService.createUpdateCategory(category);
  }
}
