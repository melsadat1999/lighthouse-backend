import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  exec = require('child_process').exec;
  // --quiet --chrome-flags="--headless" --output json --output-path ./google.json
  // lighthouse = require('lighthouse');

  generateReport(command) {
    this.exec(command, function (error, stdout, stderr) {
      console.log(error, stdout, stderr);
    });
  }

  getHello() {
    // this.generateReport(
    //   'lighthouse https://google.com --quiet --chrome-flags="--headless" --output json --output-path ./google.json',
    // );

    return 'hallo world';
  }
}
