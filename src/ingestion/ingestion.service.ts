import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngestionJob } from './entities/ingestion.entity';
import { User } from '../users/entities/user.entity';
import { Document } from '../documents/entities/document.entity';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(IngestionJob)
    private ingestionRepository: Repository<IngestionJob>,

    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async trigger(dto: TriggerIngestionDto, user: User): Promise<IngestionJob> {
    const document = await this.documentRepository.findOne({
      where: { id: dto.documentId },
    });
    if (!document) throw new NotFoundException('Document not found');

    const job = this.ingestionRepository.create({
      document,
      triggeredBy: user,
      status: 'pending',
    });
    await this.ingestionRepository.save(job);

    setTimeout(async () => {
      job.status = 'completed';
      job.result = 'Mock ingestion succeeded';
      await this.ingestionRepository.save(job);
    }, 5000);

    return job;
  }

  async getStatus(id: number): Promise<IngestionJob> {
    const job = await this.ingestionRepository.findOne({
      where: { id },
      relations: ['document', 'triggeredBy'],
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async listJobs(user: User): Promise<IngestionJob[]> {
    if (user.role.includes('admin')) {
      return this.ingestionRepository.find({
        relations: ['document', 'triggeredBy'],
      });
    }

    return this.ingestionRepository.find({
      where: { triggeredBy: { id: user.id } },
      relations: ['document', 'triggeredBy'],
    });
  }
}
