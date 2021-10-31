import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('comments') 
export class CommentCar {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ default: '' })
  message: string;

  @Column()
  carId: number;

  @OneToOne(type => Car, car=> car.comments)
  car: Car;
}
