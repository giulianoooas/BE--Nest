import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  categoryId: number;

  @Column()
  name: string;

  @OneToMany((type) => Car, (car) => car.category, {
    cascade: ['remove', 'update'],
  })
  cars: Car[];
}
