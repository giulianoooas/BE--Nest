/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  categoryId: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.category, { onDelete: 'CASCADE'})
  books: Book[];

  @Column()
  userId: number;
}
