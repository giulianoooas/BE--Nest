import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDTO } from 'src/dto/book.dto';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  public constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  public async getBookById(
    bookId: number,
  ): Promise<{ book: Book; categoryName: string }> {
    try {
      const book = await this.bookRepository.findOne(bookId);
      const categoryName = (
        await this.categoryRepository.findOne(book.categoryId)
      ).name;
      return {
        book,
        categoryName,
      };
    } catch (error) {}
  }

  public async existsBook(bookId: number): Promise<boolean> {
    try {
      return !!(await this.bookRepository.findOne(bookId));
    } catch (error) {}
  }

  public async getCategoryName(bookId: number): Promise<string> {
    try {
      const book = await this.bookRepository.findOne(bookId);
      return (await this.categoryRepository.findOne(book.categoryId)).name;
    } catch (error) {}
  }

  public async deleteBook(bookId: number): Promise<void> {
    try {
      const book = await this.bookRepository.findOne(bookId);
      await this.bookRepository.delete(book);
    } catch (error) {}
  }

  public async createUpdateBook(book: BookDTO): Promise<Book> {
    try {
      return await this.bookRepository.save(book);
    } catch (error) {}
  }
}
