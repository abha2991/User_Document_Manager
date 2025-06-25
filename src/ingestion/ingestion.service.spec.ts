// src/ingestion/ingestion.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IngestionJob } from './entities/ingestion.entity';
import { Document } from '../documents/entities/document.entity';
import { User, UserRole } from '../users/entities/user.entity';

describe('IngestionService', () => {
  let service: IngestionService;

  // Mock repositories
  const mockIngestionRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockDocumentRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: getRepositoryToken(IngestionJob),
          useValue: mockIngestionRepo,
        },
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepo,
        },
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
  });

  // Full mock User object
  const mockUser: User = {
    id: 'user1',
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: 'hashedpassword',
    role: UserRole.VIEWER,
    documents: [],
  };

  it('triggers ingestion job', async () => {
    const fakeDocument = { id: 'doc1' } as Document;
    mockDocumentRepo.findOne.mockResolvedValue(fakeDocument);

    const fakeJob = { status: 'pending' } as IngestionJob;
    mockIngestionRepo.create.mockReturnValue(fakeJob);
    mockIngestionRepo.save.mockResolvedValue(fakeJob);

    const job = await service.trigger({ documentId: 'doc1' }, mockUser);

    expect(mockDocumentRepo.findOne).toHaveBeenCalledWith({
      where: { id: 'doc1' },
    });
    expect(mockIngestionRepo.create).toHaveBeenCalledWith({
      document: fakeDocument,
      triggeredBy: mockUser,
      status: 'pending',
    });
    expect(mockIngestionRepo.save).toHaveBeenCalledWith(fakeJob);
    expect(job.status).toBe('pending');
  });

  it('throws if document not found', async () => {
    mockDocumentRepo.findOne.mockResolvedValue(null);

    await expect(
      service.trigger({ documentId: 'nonexistent' }, mockUser),
    ).rejects.toThrow();
  });
});
