import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LighthouseModule } from './lighthouse/lighthouse.module';
import { ProjectsModule } from './projects/projects.module';
import 'dotenv/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/filters/http-error.filter';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    LighthouseModule,
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
