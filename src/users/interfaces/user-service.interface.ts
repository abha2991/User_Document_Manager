import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  createUser(dto: CreateUserDto): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  updateUser(id: string, dto: UpdateUserDto): Promise<User | null>;
}
