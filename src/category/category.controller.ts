import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
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

  @Get(':categoryId/books')
  public async getAllBookOfCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Book[]> {
    return this.categoryService.getAllBookOfCategory(categoryId);
  }

  @Delete(':categoryId/delete')
  public async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Category[]> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Put(':categoryId/edit')
  public editCategory(@Body() category: Category): Promise<Category> {
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
