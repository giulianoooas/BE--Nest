/* eslint-disable prettier/prettier */
import { UserStatus } from "../enums/user-status.enum";

export interface UserDTO{
    userId?: number;
    password: string;
    email: string;
    nickname: string;
    logoUrl?: string;
    userStatus?: UserStatus;
}