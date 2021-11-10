import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderService } from '../order/order.service';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { CommentBook } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Book, CommentBook, Order]),
  ],
  controllers: [UserController],
  providers: [UserService, OrderService],
})
export class UserModule {}
