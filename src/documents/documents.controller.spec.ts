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
  });

  it('should create a document', async () => {
    mockDocumentsService.create.mockResolvedValue({ id: 'doc1' });
    const result = await controller.create(
      { title: 'Test', content: '...' },
      { user: { id: 'user1' } },
    );
    expect(result).toHaveProperty('id');
  });

  it('should get all documents', async () => {
    mockDocumentsService.findAll.mockResolvedValue([{ id: 'doc1' }]);
    const result = await controller.findAll({ user: { id: 'user1' } });
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
