import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  //
  // async createUser(email: string, hashedPassword: string): Promise<User> {
  //   const user = this.userRepository.create({
  //     email,
  //     passwordHash: hashedPassword,
  //   });
  //   return this.userRepository.save(user);
  // }
  async createUser(
    email: string,
    hashedPassword: string,
    username: string,
  ): Promise<User> {
    const user: User = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      username,
      role: UserRole.VIEWER,
    });
    return this.userRepository.save(user);
  }
}
