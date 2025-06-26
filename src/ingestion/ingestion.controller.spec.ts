import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';

describe('IngestionController', () => {
  let controller: IngestionController;

  const mockIngestionJobRepository = {};

  const mockDocumentRepository = {};

  const mockIngestionService = {
    trigger: jest.fn(),
    getStatus: jest.fn(),
    listJobs: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: mockIngestionService,
        },
        {
          provide: 'IngestionJobRepository', // Replace with actual injection token/class
          useValue: mockIngestionJobRepository,
        },
        {
          provide: 'DocumentRepository', // Replace with actual injection token/class
          useValue: mockDocumentRepository,
        },
      ],
    }).compile();

    controller = module.get<IngestionController>(IngestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
