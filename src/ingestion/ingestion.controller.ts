import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { IngestionService } from './ingestion.service';
import { TriggerIngestionDto } from './dto/trigger-ingestion.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  @Roles('admin', 'editor')
  async trigger(@Body() dto: TriggerIngestionDto, @Request() req) {
    return this.ingestionService.trigger(dto, req.user);
  }

  @Get('status/:id')
  @Roles('admin', 'editor', 'viewer')
  async getStatus(@Param('id') id: string) {
    return this.ingestionService.getStatus(+id);
  }

  @Get('jobs')
  @Roles('admin', 'editor')
  async listJobs(@Request() req) {
    return this.ingestionService.listJobs(req.user);
  }
}
