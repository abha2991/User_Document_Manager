import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_SERVICE } from './constants';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: IUserService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto);
    const { passwordHash, ...result } = user; // exclude passwordHash in response
    return result;
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    const { passwordHash, ...result } = user;
    return result;
  }
}
