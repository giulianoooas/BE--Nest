import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentDTO } from 'src/dto/comment.dto';
import { CommentCar } from 'src/entities/comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  public constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {}

  @Get(':carId/car')
  public async getCommentsByCarId(
    @Param('carId') carId: number,
  ): Promise<CommentCar[]> {
    return this.commentService.getCommentsByCarId(carId);
  }

  @Post()
  public async createComment(@Body() comment: CommentDTO): Promise<CommentCar> {
    return this.commentService.createUpdateComment(comment);
  }

  @Delete(':commentId')
  public deleteComment(
    @Param('commentId') commentId: number,
  ): Promise<boolean> {
    return this.commentService.deleteComment(commentId);
  }

  @Put(':commentId/edit')
  public editComment(@Body() comment: CommentDTO): Promise<CommentCar> {
    return this.commentService.createUpdateComment(comment);
  }
}
