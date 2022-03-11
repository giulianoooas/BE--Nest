import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
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
    return this.userService.updateUser(user);
  }

  @Delete(':userId/delete')
  public async deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @Post(':userId')
  public async changeLogo(
    @Param('userId') userId: string,
    @Body() logoUrl: string,
  ): Promise<void> {
    this.userService.changeLogo(userId, logoUrl);
  }

  @Get('all/info')
  public async getUsersInfo(@Query() userIds: number[]): Promise<
    {
      name: string;
      imageSrc: string;
      userId: number;
    }[]
  > {
    return this.userService.getUsersInfo(userIds);
  }

  @Get(':userId/info')
  public async getUserInfo(@Param('userId') userId: number): Promise<{
    name: string;
    imageSrc: string;
  } | null> {
    return this.userService.getUserInfo(userId);
  }
}
