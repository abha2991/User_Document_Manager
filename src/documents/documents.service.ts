import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentsRepository } from './repository/documents.repository';
import { DocumentsFactory } from './documents.factory';
import { CreateDocumentDto } from './dto/create-document.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepo: DocumentsRepository) {}

  async create(createDto: CreateDocumentDto, user: User) {
    const document = DocumentsFactory.createDocument(createDto, user);
    return this.documentsRepo.save(document);
  }

  async findAll(user: User) {
    return this.documentsRepo.findByOwnerId(user.id);
  }

  async findOne(id: string, user: User) {
    const document = await this.documentsRepo.findByIdAndOwner(id, user.id);
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async remove(id: string, user: User) {
    const result = await this.documentsRepo.deleteByIdAndOwner(id, user.id);
    if (result.affected === 0)
      throw new NotFoundException('Document not found');
  }
}
