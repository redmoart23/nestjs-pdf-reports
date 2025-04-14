import { Controller, Get, Res } from '@nestjs/common';
import { PuppeteerReportsService } from './puppeteer-reports.service';
import { Response } from 'express';

@Controller('puppeteer-reports')
export class PuppeteerReportsController {
  constructor(
    private readonly puppeteerReportsService: PuppeteerReportsService,
  ) {}

  @Get()
  async getPdf(@Res() res: Response) {
    const data = { name: 'Eduardo' };
    const pdfBuffer = await this.puppeteerReportsService.generatePdf(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="report.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
