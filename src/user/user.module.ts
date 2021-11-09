import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { CommentBook } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, Book, CommentBook])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
