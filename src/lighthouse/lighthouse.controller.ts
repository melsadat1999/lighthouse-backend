import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { LighthouseService } from './lighthouse.service';

@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  async create(@Query('url') url: string) {
    return await this.lighthouseService.creatEgenerateReport(url);
  }

  @Get('/generateReport/:projectId')
  async generateReport(
    @Param('projectId')
    projectId: number,
  ) {
    return await this.lighthouseService.generateReport(projectId);
  }
}
