import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';

describe('AuthService', () => {
  let service: AuthService;
  const mockAuthRepo = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockAuthRepo },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('registers a new user', async () => {
    mockAuthRepo.findByEmail.mockResolvedValue(null);
    mockAuthRepo.createUser.mockResolvedValue({
      id: 'uuid',
      email: 'test@test.com',
      role: 'viewer',
    });

    const token = await service.register('test@test.com', 'password123');
    expect(typeof token).toBe('string');
  });

  it('throws on duplicate email during register', async () => {
    mockAuthRepo.findByEmail.mockResolvedValue({ email: 'test@test.com' });

    await expect(
      service.register('test@test.com', 'password123'),
    ).rejects.toThrow();
  });

  it('logs in successfully', async () => {
    mockAuthRepo.findByEmail.mockResolvedValue({
      email: 'test@test.com',
      passwordHash: '$2b$10$somethinghashed',
      role: 'viewer',
    });
  });
});
