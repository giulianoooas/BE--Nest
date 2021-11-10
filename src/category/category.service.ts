import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from '../dto/category.dto';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { BookService } from '../book/book.service';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(BookService) private readonly bookService: BookService,
  ) {}

  public async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {}
  }

  public async getAllBookOfCategory(categoryId: number): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        where: {
          categoryId,
        },
      });
    } catch (error) {}
  }

  public async deleteCategory(categoryId: number): Promise<Category[]> {
    try {
      const category = await this.categoryRepository.findOne(categoryId);
      const books = await this.getAllBookOfCategory(categoryId);
      for (const book of books) {
        await this.bookService.deleteBook(book.bookId);
      }
      await this.categoryRepository.remove(category);
      return await this.categoryRepository.find();
    } catch (error) {}
  }

  public async createUpdateCategory(category: CategoryDTO): Promise<Category> {
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {}
  }
}
