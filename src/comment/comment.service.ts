/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO } from 'src/dto/comment.dto';
import { CommentBook } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(CommentBook)
    private readonly commentRepository: Repository<CommentBook>,
  ) {}

  public async getCommentsByBookId(bookId: number): Promise<CommentBook[]> {
    try {
      return await this.commentRepository.find({
        where: {
          bookId,
        },
      });
    } catch (error) {}
  }

  public async deleteComment(commentId: number): Promise<boolean> {
    try {
      const comment = await this.commentRepository.findOne(commentId);
      if (comment) {
        await this.commentRepository.remove(comment);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async createUpdateComment(comment: CommentDTO): Promise<CommentBook> {
    try {
      return await this.commentRepository.save({
        commentId: comment?.commentId,
        bookId: comment.bookId,
        message: comment.message,
        date: comment.date.toString(),
        userId: comment.userId,
      });
    } catch (error) {}
  }
}
