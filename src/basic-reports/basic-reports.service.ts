import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

//TODO: optimize
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  getHello() {
    const printer = new PdfPrinter(fontDescriptors);

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'Hello world',
        },
      ],
    };

    const doc = printer.createPdfKitDocument(docDefinition);
    return doc;
  }
}
