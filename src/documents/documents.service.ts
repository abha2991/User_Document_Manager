import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentsRepository } from './repository/documents.repository';
import { DocumentsFactory } from './documents.factory';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { User } from '../users/entities/user.entity';
import { S3File } from '../common/interfaces/s3-file.interface';
@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepo: DocumentsRepository) {}
  //
  // async create(createDto: CreateDocumentDto, user: User) {
  //   const document = DocumentsFactory.createDocument(createDto, user);
  //   return this.documentsRepo.save(document);
  // }
  // async create(
  //   createDto: CreateDocumentDto,
  //   user: User,
  //   file?: Express.MulterS3.File,
  // ) {
  //   const document = DocumentsFactory.createDocument(createDto, user);
  //   if (file) {
  //     document.fileKey = file.key; // S3 object key
  //     document.fileUrl = file.location; // full URL to access file (if public)
  //   }
  //   return this.documentsRepo.save(document);
  // }
  async create(
    createDto: CreateDocumentDto,
    user: User,
    file?: S3File,
  ): Promise<Document> {
    const document = new Document();
    document.title = createDto.title;
    document.content = createDto.content;
    document.owner = user;

    if (file) {
      document.fileKey = file.key;
      document.fileUrl = file.location;
    }
    return await this.documentsRepo.save(document);
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
