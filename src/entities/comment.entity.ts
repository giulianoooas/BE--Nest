/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('comments') 
export class CommentCar {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ default: '' })
  message: string;

  @Column()
  carId: number;

  @Column()
  date: string;

  @ManyToOne(() => Car, car=> car.comments, { cascade: true })
  car: Car;
}
