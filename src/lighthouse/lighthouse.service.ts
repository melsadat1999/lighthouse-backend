import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { rejects } from 'assert';
import { Project } from 'src/projects/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/reports/entities/report.entity';

@Injectable()
export class LighthouseService {
  exec = require('child_process').exec;

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async generateReport(projectId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['reports'],
    });
    console.log(project, projectId);
    if (!project) {
      throw new HttpException('Not Found Project', HttpStatus.NOT_FOUND);
    }

    const report: any = await this.creatEgenerateReport(project.url);
    report.project = project;
    const reportData = await this.reportRepository.create(report);
    const sevedReport: any = await this.reportRepository.save(reportData);
    delete sevedReport.project;
    project.reports.push(sevedReport);
    await this.projectRepository.save(project);
    return project;
  }

  creatEgenerateReport(url) {
    if (!url) throw new HttpException('Not Found URL', HttpStatus.BAD_REQUEST);
    const command = `lighthouse ${url} --chrome-flags="--headless" --output json --output-path ./src/reports/report-data/${this.getWebsiteName(
      url,
    )}.json`;
    console.log(url);
    return new Promise((resolve, rejects) => {
      this.exec(command, async (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        if (error) {
          console.log('erorr');
          rejects(error);
          return;
        }
        if (stderr) {
          return resolve(this.getFile(this.getWebsiteName(url)));
        }
      });
    });
  }

  async getFile(name: string) {
    const data = (await readFileSync(
      `./src/reports/report-data/${name}.json`,
      'utf-8',
    )) as any;

    const searchEngin = {
      performance: JSON.parse(data).categories.performance.score,
      accessibility: JSON.parse(data).categories.accessibility.score,
      bestPractices: JSON.parse(data).categories['best-practices'].score,
      seo: JSON.parse(data).categories.seo.score,
      pwa: JSON.parse(data).categories.pwa.score,
      firstContentfulPaint: {
        time: JSON.parse(data).audits['first-contentful-paint'].displayValue,
        score: JSON.parse(data).audits['first-contentful-paint'].score,
      },
      totalBlockingTime: {
        time: JSON.parse(data).audits['total-blocking-time'].displayValue,
        score: JSON.parse(data).audits['total-blocking-time'].score,
      },
      speedIndex: {
        time: JSON.parse(data).audits['speed-index'].displayValue,
        score: JSON.parse(data).audits['speed-index'].score,
      },
      largestContentfulPaint: {
        time: JSON.parse(data).audits['largest-contentful-paint'].displayValue,
        score: JSON.parse(data).audits['largest-contentful-paint'].score,
      },
      cumulativeLayoutShift: {
        time: JSON.parse(data).audits['cumulative-layout-shift'].displayValue,
        score: JSON.parse(data).audits['cumulative-layout-shift'].score,
      },
    };
    return searchEngin;
  }

  getWebsiteName(url: string) {
    return url.match('https?://(www.)?([a-zA-Z0-9]+)(.[a-zA-Z0-9.-]+)')[2];
  }
}
