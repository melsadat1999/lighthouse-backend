import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UpdateLighthouseDto } from './dto/update-lighthouse.dto';
import { readFileSync } from 'fs';
import { rejects } from 'assert';
@Injectable()
export class LighthouseService {
  exec = require('child_process').exec;

  constructor(private httpService: HttpService) {}

  creatEgenerateReport(url) {
    const command = `lighthouse ${url} --chrome-flags="--headless" --output json --output-path ./src/report/${this.getWebsiteName(
      url,
    )}.json`;
    console.log(url);
    return new Promise((resolve, rejects) => {
      this.exec(command, async (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        if (error) {
          console.log('erorr');
          rejects(error)
          return;
        }
        if (stderr) {
          console.log('success');
          return resolve(this.getFile(this.getWebsiteName(url)));
        }
      });
    });
  }

  async getFile(name: string) {
    const data = (await readFileSync(
      `./src/report/${name}.json`,
      'utf-8',
    )) as any;

    const searchEngin = {
      performance: JSON.parse(data).categories.performance.score,
      accessibility: JSON.parse(data).categories.accessibility.score,
      bestPractices: JSON.parse(data).categories['best-practices'].score,
      seo: JSON.parse(data).categories.seo.score,
      pwa: JSON.parse(data).categories.pwa.score,
    };
    console.log(searchEngin);
    return searchEngin;
  }

  getWebsiteName(url: string) {
    return url.match('https?://(www.)?([a-zA-Z0-9]+)(.[a-zA-Z0-9.-]+)')[2];
  }
}
