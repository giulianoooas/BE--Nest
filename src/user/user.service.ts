import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async createUpdateUser(userDTO: UserDTO): Promise<User> {
    try {
      return await this.userRepository.save(userDTO);
    } catch (error) {}
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  public async login(userLogin: {
    email: string;
    password: string;
  }): Promise<User> {
    const users = await this.userRepository.find();
    for (const user of users) {
      if (
        user.email === userLogin.email &&
        user.password === userLogin.password
      ) {
        return user;
      }
    }
  }
}
