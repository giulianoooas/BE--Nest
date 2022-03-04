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
import { ForumCommentDto } from 'src/dto/forum-comment.dto';
import { ForumTextDto } from 'src/dto/forum-text.dto';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { ForumText } from 'src/entities/forum-text.entity';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  public constructor(
    @Inject(ForumService) private readonly forumService: ForumService,
  ) {}

  @Get()
  public async getAllForumText(): Promise<ForumText[]> {
    return this.forumService.getAllForumText();
  }

  @Get(':forumTextId')
  public async getAllForumTextComments(
    @Param('forumTextId') forumTextId: number,
  ): Promise<ForumComment[]> {
    return this.forumService.getCommentsForText(forumTextId);
  }

  @Post('forumText')
  public createForumText(@Body() forumText: ForumTextDto): Promise<ForumText> {
    return this.forumService.createEditForumText(forumText);
  }

  @Put('forumText/:forumTextId')
  public editForumText(@Body() forumText: ForumTextDto): Promise<ForumText> {
    return this.forumService.createEditForumText(forumText);
  }

  @Post('forumComment')
  public createForumComment(
    @Body() forumComment: ForumCommentDto,
  ): Promise<ForumComment> {
    return this.forumService.createEditForumComment(forumComment);
  }

  @Put('forumComment/:forumCommentId')
  public editForumComment(
    @Body() forumComment: ForumCommentDto,
  ): Promise<ForumComment> {
    return this.forumService.createEditForumComment(forumComment);
  }

  @Delete('forumText/:forumTextId')
  public async deleteForumText(
    @Param('forumTextId') forumTextId: number,
  ): Promise<void> {
    return this.forumService.deleteForumText(forumTextId);
  }

  @Delete('forumComment/:forumCommentId')
  public async deleteForumComment(
    @Param('forumCommentId') forumCommentId: number,
  ): Promise<void> {
    return this.forumService.deleteForumComment(forumCommentId);
  }
}
