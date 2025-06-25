import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { User } from '../users/entities/user.entity';

export class DocumentsFactory {
  static createDocument(createDto: CreateDocumentDto, owner: User): Document {
    const document = new Document();
    document.title = createDto.title;
    document.content = createDto.content;
    document.owner = owner;
    return document;
  }
}
