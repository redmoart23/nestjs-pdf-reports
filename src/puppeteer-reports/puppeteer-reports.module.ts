import { Module } from '@nestjs/common';
import { PuppeteerReportsService } from './puppeteer-reports.service';
import { PuppeteerReportsController } from './puppeteer-reports.controller';

@Module({
  controllers: [PuppeteerReportsController],
  providers: [PuppeteerReportsService],
})
export class PuppeteerReportsModule {}
