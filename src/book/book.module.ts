import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../order/order.service';
import { CommentService } from '../comment/comment.service';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CommentBook } from '../entities/comment.entity';
import { Order } from '../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category, CommentBook, Order])],
  controllers: [BookController],
  providers: [BookService, CommentService, OrderService],
  exports: [BookService],
})
export class BookModule {}
