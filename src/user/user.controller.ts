import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  public constructor(
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('login')
  public async getConnection(
    @Body() user: { email: string; password: string },
  ): Promise<User | null> {
    return this.userService.login(user);
  }

  @Post()
  public async createUser(@Body() user: UserDTO): Promise<User | null> {
    return this.userService.createUpdateUser(user);
  }

  @Put(':userId')
  public async updateUser(@Body() user: UserDTO): Promise<User | null> {
    return this.userService.createUpdateUser(user);
  }

  @Delete(':userId/delete')
  public async deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
