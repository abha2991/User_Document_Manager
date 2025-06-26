import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  const mockDocumentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        { provide: DocumentsService, useValue: mockDocumentsService },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    jest.clearAllMocks();
  });

  it('should create a document', async () => {
    mockDocumentsService.create.mockResolvedValue({ id: 'doc1' });
    const result = await controller.create(
      { title: 'Test', content: '...' },
      null, // no file uploaded
      { user: { id: 'user1' } },
    );
    expect(result).toHaveProperty('id');
    expect(mockDocumentsService.create).toHaveBeenCalledWith(
      { title: 'Test', content: '...' },
      { id: 'user1' },
      null,
    );
  });

  it('should get all documents', async () => {
    mockDocumentsService.findAll.mockResolvedValue([{ id: 'doc1' }]);
    const result = await controller.findAll({ user: { id: 'user1' } });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(mockDocumentsService.findAll).toHaveBeenCalledWith({ id: 'user1' });
  });

  it('should get one document', async () => {
    mockDocumentsService.findOne.mockResolvedValue({ id: 'doc1' });
    const result = await controller.findOne('doc1', { user: { id: 'user1' } });
    expect(result).toHaveProperty('id', 'doc1');
    expect(mockDocumentsService.findOne).toHaveBeenCalledWith('doc1', {
      id: 'user1',
    });
  });

  it('should remove a document', async () => {
    mockDocumentsService.remove.mockResolvedValue(undefined);
    await expect(
      controller.remove('doc1', { user: { id: 'user1' } }),
    ).resolves.toBeUndefined();
    expect(mockDocumentsService.remove).toHaveBeenCalledWith('doc1', {
      id: 'user1',
    });
  });
});
