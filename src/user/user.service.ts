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
        if (user.email === userDTO.email) {
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
}
