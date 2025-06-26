import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Inject,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { USER_SERVICE } from './constants';

@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Get()
  @Roles('admin', 'editor')
  async findAll() {
    const users = await this.usersService.findAllUsers();
    return users.map(({ passwordHash, ...user }) => user);
  }
  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    const { passwordHash, ...result } = user;
    return result;
  }
  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req,
  ) {
    const updatedUser = await this.usersService.updateUser(id, dto);
    if (!updatedUser) throw new NotFoundException('User not found');
    const { passwordHash, ...result } = updatedUser;
    return result;
  }
}
