import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { CommentCar } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, Car, CommentCar])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
