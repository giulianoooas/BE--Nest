/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ForumComment } from './forum-comment.entity';

@Entity('forum-texts')
export class ForumText {
  @PrimaryGeneratedColumn('increment')
  forumTextId: number;

  @Column({nullable: true})
  userId: string;

  @OneToMany(() => ForumComment, (forumComment) => forumComment.forumText, { onDelete: 'CASCADE'})
  forumComments: ForumComment[];

  @Column()
  date: string;

  @Column()
  text: string;
}
