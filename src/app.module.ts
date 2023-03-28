import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LighthouseModule } from './lighthouse/lighthouse.module';

@Module({
  imports: [LighthouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
