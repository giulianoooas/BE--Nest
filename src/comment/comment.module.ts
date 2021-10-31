import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentCar } from 'src/entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentCar])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
