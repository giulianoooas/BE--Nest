/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { CommentCar } from './comment.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('increment')
  public carId: string;

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

  @ManyToOne(() => Category, (category) => category.cars, { cascade: true })
  category: Category;

  @OneToMany(() => CommentCar, (comment) => comment.car, {  onDelete: 'CASCADE' })
  comments: CommentCar[];

  @Column()
  userId: number;
}
