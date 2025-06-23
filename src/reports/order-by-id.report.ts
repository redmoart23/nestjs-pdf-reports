import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/tucan-banner.png', // Replace with your logo URL
  width: 100,
  margin: [10, 20], // Adjust margins as needed
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0], // [left, top, right, bottom]
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const getOrderByIdReport = (
  value: ReportValues,
): TDocumentDefinitions => {
  const { data } = value;
  if (!data) {
    throw new Error('No data provided for the report');
  }
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
    content: [
      // Header section with logo and title
      {
        text: 'Tucan Code',
        style: 'header',
      },
      // Address and receipt information
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
          },
          {
            text: 'Recibo No#: 10255\nFecha del recibo: 11 de julio de 2021\nPagar antes de: 18 de mayo de 2024',
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://pdfmake.github.io/docs/0.1/document-definition-object/qr/', // URL or text to encode in the QR code
        fit: 75,
        margin: [0, 20, 0, 20], // Margin around the QR code
        alignment: 'right', // Center the QR code
      },
      {
        text: 'Cobrar a:\nRazón Social: Richter Supermarkt\nMichael Holz\nGrenzacherweg 237',
        margin: [0, 20, 0, 30], // Margin around the text
      },
      {
        layout: 'headerLineOnly', // Use a predefined layout for the table
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Descripción', style: 'tableHeader' },
              { text: 'Cantidad', style: 'tableHeader' },
              { text: 'Precio Unitario', style: 'tableHeader' },
              { text: 'Total', style: 'tableHeader' },
            ],
            ['Producto A', 2, '$10.00', '$20.00'],
            ['Producto B', 1, '$15.00', '$15.00'],
            ['Producto C', 3, '$5.00', '$15.00'],
            [{ text: 'Total:', colSpan: 3 }, {}, {}, '$50.00'],
          ],
        },
      },
      {
        margin: [0, 20, 0, 0], // Margin around the footer
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [{ text: 'Subtotal:', alignment: 'right' }, '$50.00'],
                [{ text: 'IVA (19%):', alignment: 'right' }, '$9.50'],
                [{ text: 'Total:', alignment: 'right', bold: true }, '$59.50'],
              ],
            },
          },
        ],
      },
    ],
  };
};
