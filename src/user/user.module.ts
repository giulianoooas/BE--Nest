import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Category } from '../entities/category.entity';
import { CommentBook } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, Book, CommentBook])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
