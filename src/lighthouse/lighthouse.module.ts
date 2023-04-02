import { Module } from '@nestjs/common';
import { LighthouseService } from './lighthouse.service';
import { LighthouseController } from './lighthouse.controller';
import { Project } from 'src/projects/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/reports/entities/report.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,Report])],
  controllers: [LighthouseController],
  providers: [LighthouseService]
})
export class LighthouseModule {}
