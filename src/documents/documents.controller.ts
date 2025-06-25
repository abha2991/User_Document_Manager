import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3File } from '../common/interfaces/s3-file.interface';
import { multerS3Options } from '../common/multer-s3.interceptor';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Roles('admin', 'editor')
  // create(@Body() createDto: CreateDocumentDto, @Req() req) {
  //   return this.documentsService.create(createDto, req.user);
  @UseInterceptors(FileInterceptor('file', multerS3Options))
  async create(
    @Body() createDto: CreateDocumentDto,
    @UploadedFile() file: S3File,
    @Req() req,
  ) {
    return this.documentsService.create(createDto, req.user, file);
  }

  @Get()
  @Roles('admin', 'editor', 'viewer')
  findAll(@Req() req) {
    return this.documentsService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'editor', 'viewer')
  findOne(@Param('id') id: string, @Req() req) {
    return this.documentsService.findOne(id, req.user);
  }

  @Delete(':id')
  @Roles('admin', 'editor')
  remove(@Param('id') id: string, @Req() req) {
    return this.documentsService.remove(id, req.user);
  }
}
