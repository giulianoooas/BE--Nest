/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('comments') 
export class CommentBook {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ default: '' })
  message: string;

  @Column()
  bookId: number;

  @Column()
  date: string;

  @ManyToOne(() => Book, book=> book.comments, { cascade: true })
  book: Book;

  @Column()
  userId: number;
}
