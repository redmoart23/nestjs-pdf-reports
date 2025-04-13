import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  getHello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.getHello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello-World';

    pdfDoc.pipe(response);

    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';

    pdfDoc.pipe(response);

    pdfDoc.end();
  }
}
