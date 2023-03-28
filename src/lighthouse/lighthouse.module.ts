import { Module } from '@nestjs/common';
import { LighthouseService } from './lighthouse.service';
import { LighthouseController } from './lighthouse.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [LighthouseController],
  providers: [LighthouseService]
})
export class LighthouseModule {}
