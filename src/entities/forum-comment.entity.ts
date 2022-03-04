/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ForumText } from './forum-text.entity';

@Entity('forum-comments')
export class ForumComment {
  @PrimaryGeneratedColumn('increment')
  forumCommentId: number;

  @Column({nullable: true})
  userId: string;

  @ManyToOne(() => ForumText, (forumText) => forumText.forumComments, { cascade: true })
  forumText: ForumText;

  @Column()
  forumTextId: number;

  @Column()
  text: string;

  @Column()
  date: string;
}
