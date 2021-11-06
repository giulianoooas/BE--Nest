/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column({default:false})
    isAdmin: boolean;

    @Column()
    email: string;

    @Column()
    password: string;
}