import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { PuppeteerReportsModule } from './puppeteer-reports/puppeteer-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, PuppeteerReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
