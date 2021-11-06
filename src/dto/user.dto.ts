/* eslint-disable prettier/prettier */
export interface UserDTO{
    userId?: number;
    firstName: string;
    lastName?: string;
    password: string;
    email: string;
    isAdmin?: boolean;
}