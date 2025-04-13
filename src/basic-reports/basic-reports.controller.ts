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
    pdfDoc.info.Title = 'Hello-World.pdf';

    pdfDoc.pipe(response);

    pdfDoc.end();
  }
}
