import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserRole } from '../entities/user.entity';

export interface IUserCreationStrategy {
  createUser(dto: CreateUserDto): User;
}

export class DefaultUserCreationStrategy implements IUserCreationStrategy {
  createUser(dto: CreateUserDto): User {
    const user = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.passwordHash = dto.password; // raw password here, will be hashed later in service
    user.role = dto.role || UserRole.VIEWER;
    return user;
  }
}

export class AdminUserCreationStrategy implements IUserCreationStrategy {
  createUser(dto: CreateUserDto): User {
    const user = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.passwordHash = dto.password;
    user.role = UserRole.ADMIN;
    return user;
  }
}

export class UserFactory {
  static getStrategy(role?: UserRole): IUserCreationStrategy {
    if (role === UserRole.ADMIN) {
      return new AdminUserCreationStrategy();
    }
    return new DefaultUserCreationStrategy();
  }
}
