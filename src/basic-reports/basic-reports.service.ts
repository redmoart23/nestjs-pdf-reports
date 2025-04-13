import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  getHello() {
    const docDefinition = getHelloWorldReport({ name: 'John Doe' });

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employees = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employees) {
      throw new NotFoundException('Employee not found');
    }

    const docDefinition = getEmploymentLetterByIdReport(employees);

    const doc = this.printerService.createPdf(docDefinition, {});
    return doc;
  }
}
