import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  public async createUpdateUser(userDTO: UserDTO): Promise<User | null> {
    try {
      const users = await this.userRepository.find();
      for (const user of users) {
        if (
          user.email === userDTO.email ||
          user.nickname === userDTO.nickname
        ) {
          return null;
        }
      }
      return await this.userRepository.save(userDTO);
    } catch (error) {}
  }

  public async updateUser(userDTO: UserDTO): Promise<User | null> {
    try {
      const users = await this.userRepository.find();
      for (const user of users) {
        if (
          user.userId !== userDTO.userId &&
          (user.email === userDTO.email || user.nickname === userDTO.nickname)
        ) {
          return null;
        }
      }
      return await this.userRepository.save(userDTO);
    } catch (error) {}
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
    await this.orderService.deleteAllUserOrders(userId);
  }

  public async login(userLogin: {
    email: string;
    password: string;
  }): Promise<User | null> {
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

  public async changeLogo(userId: string, logoUrl: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    user.logoUrl = logoUrl;
    await this.userRepository.save(user);
  }

  public async getUserInfo(userId: number): Promise<{
    name: string;
    imageSrc: string;
  } | null> {
    const user = await this.userRepository.findOne(userId);
    if (user) {
      return { imageSrc: user.logoUrl, name: user.nickname };
    }
    return null;
  }

  public async getUsersInfo(userIds: number[]): Promise<
    {
      name: string;
      imageSrc: string;
    }[]
  > {
    const res = [];
    for (const userId of userIds) {
      const user = await this.getUserInfo(userId);
      if (user) {
        res.push(user);
      }
    }
    return res;
  }
}
