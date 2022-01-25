import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentBook } from '../entities/comment.entity';
import { Order } from '../entities/order.entity';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { BookService } from '../book/book.service';
import { OrderService } from '../order/order.service';
import { CommentService } from '../comment/comment.service';
import { KnnUnsupervised } from 'src/price-predict/models-ml/knn.model';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book, CommentBook, Order])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    BookService,
    OrderService,
    CommentService,
    KnnUnsupervised,
  ],
})
export class CategoryModule {}
