import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async findAll() {
    return await this.reportRepository.find({ relations: ['project'] });
  }

  async findOne(id: number) {
    return await this.reportRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }
}
