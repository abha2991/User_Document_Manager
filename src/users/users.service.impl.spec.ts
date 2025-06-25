import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceImpl } from './users.service.impl';
import { USER_REPOSITORY } from './constants';
import { User } from './entities/user.entity';

describe('UsersServiceImpl', () => {
  let service: UsersServiceImpl;
  const mockUserRepository = {
    save: jest.fn(),
    findByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceImpl,
        { provide: USER_REPOSITORY, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersServiceImpl>(UsersServiceImpl);
  });

  it('should hash password and save user', async () => {
    mockUserRepository.save.mockResolvedValue({
      id: 'uuid',
      username: 'john',
      email: 'john@example.com',
      passwordHash: 'hashedPassword',
      role: 'viewer',
    });

    const user = await service.createUser({
      username: 'john',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should find user by username', async () => {
    mockUserRepository.findByUsername.mockResolvedValue({
      username: 'john',
    } as User);

    const user = await service.findByUsername('john');
    expect(user.username).toBe('john');
  });
});
