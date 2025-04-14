import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerReportsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generatePdf(data: any): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Render HTML from data
    const htmlContent = `
   <html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Table</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f9fb;
      padding: 2rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    thead {
      background-color: #6c5ce7;
      color: white;
    }

    th, td {
      padding: 1rem;
      text-align: left;
    }

    tbody tr {
      border-bottom: 1px solid #ececec;
    }

    tbody tr:hover {
      background-color: #f0f4ff;
    }

    .price {
      color: #00b894;
      font-weight: bold;
    }

    .in-stock {
      color: #0984e3;
    }

    .out-of-stock {
      color: #d63031;
    }
  </style>
</head>
<body>

  <h2>Product List</h2>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Category</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Wireless Headphones</td>
        <td>Electronics</td>
        <td class="price">$59.99</td>
        <td class="in-stock">In Stock</td>
      </tr>
      <tr>
        <td>Cotton T-Shirt</td>
        <td>Clothing</td>
        <td class="price">$14.99</td>
        <td class="in-stock">In Stock</td>
      </tr>
      <tr>
        <td>Espresso Maker</td>
        <td>Appliances</td>
        <td class="price">$89.99</td>
        <td class="out-of-stock">Out of Stock</td>
      </tr>
      <tr>
        <td>Yoga Mat</td>
        <td>Fitness</td>
        <td class="price">$24.50</td>
        <td class="in-stock">In Stock</td>
      </tr>
    </tbody>
  </table>

</body>
</html>
        `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }
}
