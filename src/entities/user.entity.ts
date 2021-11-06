/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column({default:false})
    isAdmin: boolean;

    @Column()
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;
}