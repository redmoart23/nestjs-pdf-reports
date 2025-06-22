import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly printerService: PrinterService, // Assuming PrinterService is imported correctly
  ) {}

  getOrderByIdReport(orderId: string) {
    const docDefinition = getHelloWorldReport({ name: `Order ID: ${orderId}` });

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }
}
