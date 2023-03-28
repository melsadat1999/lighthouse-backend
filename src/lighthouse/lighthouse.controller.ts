import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LighthouseService } from './lighthouse.service';

@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  async create(@Query('url') url: string) {
    return await this.lighthouseService.creatEgenerateReport(url);
  }
}
