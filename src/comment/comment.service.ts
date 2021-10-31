import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO } from 'src/dto/comment.dto';
import { CommentCar } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(CommentCar)
    private readonly commentRepository: Repository<CommentCar>,
  ) {}

  public async getCommentsByCarId(carId: string): Promise<CommentCar[]> {
    return await this.commentRepository.find({
      where: {
        carId,
      },
    });
  }

  public async deleteComment(commentId: number): Promise<boolean> {
    const comment = await this.commentRepository.findOne(commentId);
    if (comment) {
      await this.commentRepository.remove(comment);
      return true;
    }
    return false;
  }

  public async createUpdateComment(comment: CommentDTO): Promise<CommentCar> {
    return await this.commentRepository.save({
      commentId: comment?.commentId,
      carId: comment.carId,
      message: comment.message,
      date: comment.date.toString(),
    });
  }
}
