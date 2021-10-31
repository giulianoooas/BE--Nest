/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
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

  @OneToOne((type) => Category, (category) => category.cars)
  category: Category;

  @ManyToOne((type) => CommentCar, (comment) => comment.car)
  comments: CommentCar[];
}
