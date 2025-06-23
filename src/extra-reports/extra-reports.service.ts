import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {} // Replace 'any' with the actual type of your printer service
  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-01.html', 'utf8');

    const content = getHtmlContent(html);

    const docDefinition: TDocumentDefinitions = {
      header: headerSection({
        title: 'Hello World Report',
        subtitle: 'This is a subtitle for the Hello World Report',
        showLogo: false,
        showDate: false,
      }),
      content,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
