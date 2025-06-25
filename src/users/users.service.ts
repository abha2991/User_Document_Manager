import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFactory } from './factories/user-factory';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './constants';

@Injectable()
export class UsersServiceImpl implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const strategy = UserFactory.getStrategy(dto.role);
    const user = strategy.createUser(dto);

    user.passwordHash = await this.hashPassword(user.passwordHash);

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
