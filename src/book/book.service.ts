import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentService } from '../comment/comment.service';
import { BookDTO } from '../dto/book.dto';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { OrderService } from '../order/order.service';
import { KnnUnsupervised } from 'src/price-predict/models-ml/knn.model';

@Injectable()
export class BookService {
  public constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(CommentService) private readonly commentService: CommentService,
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(KnnUnsupervised) private readonly knnUnsupervised: KnnUnsupervised,
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
      await this.orderService.deleteAllBookOrders(bookId);
      await this.commentService.deleteAllCommentsOfBook(bookId);
      await this.bookRepository.delete(book);
    } catch (error) {}
  }

  public async createUpdateBook(book: BookDTO): Promise<Book> {
    try {
      return await this.bookRepository.save(book);
    } catch (error) {}
  }

  public async getSeeAlso(bookId: number): Promise<Book[]> {
    const books = await this.bookRepository.find();
    this.knnUnsupervised.setTrainingData(books);
    return this.knnUnsupervised.predictBooks(bookId);
  }
}
