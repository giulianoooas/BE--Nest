/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { CommentBook } from './comment.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  public bookId: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.books, { cascade: true })
  category: Category;

  @OneToMany(() => CommentBook, (comment) => comment.book, {  onDelete: 'CASCADE' })
  comments: CommentBook[];

  @Column()
  userId: number;
}
