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
import { BookDTO } from '../dto/book.dto';
import { Book } from '../entities/book.entity';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  public constructor(
    @Inject(BookService) private readonly bookService: BookService,
  ) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':bookId')
  async getBookById(
    @Param('bookId') bookId: number,
  ): Promise<{ book: Book; categoryName: string }> {
    return this.bookService.getBookById(bookId);
  }

  @Get(':bookId/see-also')
  async getSeeAlsoBooks(@Param('bookId') bookId: number): Promise<Book[]> {
    return this.bookService.getSeeAlso(bookId);
  }

  @Get(':bookId/exists')
  async existsBook(@Param('bookId') bookId: number): Promise<boolean> {
    return this.bookService.existsBook(bookId);
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: number): Promise<void> {
    return this.bookService.deleteBook(bookId);
  }

  @Get(':bookId/category-name')
  async categoryName(@Param('bookId') bookId: number): Promise<string> {
    return this.bookService.getCategoryName(bookId);
  }

  @Post()
  async createBook(@Body() book: BookDTO): Promise<Book> {
    return this.bookService.createUpdateBook(book);
  }

  @Put(':bookId/edit')
  async updateBook(
    @Body() book: BookDTO,
    @Param('bookId') bookId: number,
  ): Promise<Book> {
    return this.bookService.createUpdateBook(book);
  }
}
