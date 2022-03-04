import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForumCommentDto } from 'src/dto/forum-comment.dto';
import { ForumTextDto } from 'src/dto/forum-text.dto';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { ForumText } from 'src/entities/forum-text.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForumService {
  public constructor(
    @InjectRepository(ForumComment)
    private readonly forumCommentRepository: Repository<ForumComment>,
    @InjectRepository(ForumText)
    private readonly forumTextRepository: Repository<ForumText>,
  ) {}

  public async getAllForumText(): Promise<ForumText[]> {
    return await this.forumTextRepository.find();
  }

  public async getCommentsForText(
    forumTextId: number,
  ): Promise<ForumComment[]> {
    try {
      return await this.forumCommentRepository.find({ where: { forumTextId } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async createEditForumText(
    forumText: ForumTextDto,
  ): Promise<ForumText> {
    try {
      const formTextObj = {
        forumTextId: forumText.forumTextId,
        text: forumText.text,
        date: this.dateFormatter(forumText.date),
        userId: forumText.userId,
      } as unknown as ForumText;
      return await this.forumTextRepository.save(formTextObj);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async createEditForumComment(
    forumComment: ForumCommentDto,
  ): Promise<ForumComment> {
    try {
      const formCommentObj = {
        forumCommentId: forumComment.forumCommentId,
        forumTextId: forumComment.forumTextId,
        text: forumComment.text,
        date: this.dateFormatter(forumComment.date),
        userId: forumComment.userId,
      } as unknown as ForumComment;
      return await this.forumCommentRepository.save(formCommentObj);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async deleteForumComment(forumCommentId: number): Promise<void> {
    try {
      await this.forumCommentRepository.delete({ forumCommentId });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async deleteForumText(forumTextId: number): Promise<void> {
    try {
      await this.forumTextRepository.delete({ forumTextId });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  private dateFormatter(date: Date): string {
    date = new Date(date);
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return `${day}-${month}-${year}`;
  }
}
