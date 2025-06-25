import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import { AuthFactory } from './auth.factory';
import { generateToken } from '../common/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async register(
    email: string,
    password: string,
    username?: string,
  ): Promise<string> {
    const existingUser = await this.authRepo.findByEmail(email);
    if (existingUser) throw new ConflictException('Email already in use');

    const hashedPassword = await AuthFactory.hashPassword(password);

    if (!username) {
      username = email.split('@')[0];
    }

    const user = await this.authRepo.createUser(
      email,
      hashedPassword,
      username,
    );

    return generateToken({ sub: user.id, email: user.email, role: user.role });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.authRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordsMatch = await AuthFactory.comparePasswords(
      password,
      user.passwordHash,
    );
    if (!passwordsMatch) throw new UnauthorizedException('Invalid credentials');

    return generateToken({ sub: user.id, email: user.email, role: user.role });
  }
}
