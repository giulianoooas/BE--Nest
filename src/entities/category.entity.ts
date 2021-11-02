/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  categoryId: number;

  @Column()
  name: string;

  @OneToMany(() => Car, (car) => car.category, { onDelete: 'CASCADE'})
  cars: Car[];
}
