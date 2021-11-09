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
import { CommentBook } from 'src/entities/comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  public constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {}

  @Get(':bookId/book')
  public async getCommentsByBookId(
    @Param('bookId') bookId: number,
  ): Promise<CommentBook[]> {
    return this.commentService.getCommentsByBookId(bookId);
  }

  @Post()
  public async createComment(@Body() comment: CommentDTO): Promise<CommentBook> {
    if (comment.commentId < 0) {
      delete comment.commentId;
    }
    return this.commentService.createUpdateComment(comment);
  }

  @Delete(':commentId/delete')
  public deleteComment(
    @Param('commentId') commentId: number,
  ): Promise<boolean> {
    return this.commentService.deleteComment(commentId);
  }

  @Put(':commentId/edit')
  public editComment(@Body() comment: CommentDTO): Promise<CommentBook> {
    return this.commentService.createUpdateComment(comment);
  }
}
