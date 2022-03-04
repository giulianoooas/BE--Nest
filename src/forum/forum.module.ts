import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { ForumText } from 'src/entities/forum-text.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ForumComment, ForumText])],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
