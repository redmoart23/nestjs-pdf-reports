import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';
@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  getHtmlReport(@Res() response: Response) {
    const doc = this.extraReportsService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    doc.info.Title = 'Hello World Report';
    doc.pipe(response);
    doc.end();
  }
}
