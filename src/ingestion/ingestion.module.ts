import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { IngestionJob } from './entities/ingestion.entity';
import { Document } from '../documents/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngestionJob, Document])],
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
