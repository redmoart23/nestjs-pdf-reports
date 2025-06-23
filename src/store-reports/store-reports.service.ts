import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicChartSvgReport, getOrderByIdReport } from 'src/reports';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const docDefinition = getOrderByIdReport({
      data: order as any, // Cast to any to match the expected type
      title: 'Order Report',
      subtitle: `Order ID: ${orderId}`,
    });

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }
}
