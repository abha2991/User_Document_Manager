import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  createUser(dto: CreateUserDto): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
