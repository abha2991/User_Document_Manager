import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
  ) {}

  create(document: Partial<Document>): Document {
    return this.repo.create(document);
  }

  save(document: Document) {
    return this.repo.save(document);
  }

  findByOwnerId(ownerId: string) {
    return this.repo.find({ where: { owner: { id: ownerId } } });
  }

  findByIdAndOwner(id: string, ownerId: string) {
    return this.repo.findOne({ where: { id, owner: { id: ownerId } } });
  }

  deleteByIdAndOwner(id: string, ownerId: string) {
    return this.repo.delete({ id, owner: { id: ownerId } });
  }
}
