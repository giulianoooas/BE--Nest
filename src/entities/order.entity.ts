/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order{
    @PrimaryGeneratedColumn('increment')
    orderId: number;

    @Column()
    userId: number;

    @Column()
    bookId: number;

    @Column()
    date: string;

    @Column()
    numberOfElements: number;
}