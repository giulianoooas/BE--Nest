/* eslint-disable prettier/prettier */
import { UserStatus } from "../enums/user-status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: UserStatus.CUSTOMER})
    userStatus: UserStatus;
}