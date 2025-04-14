import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from 'generated/prisma';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title || 'Reporte de Países',
      subtitle: subtitle || 'Lista de países',
      showLogo: true,
      showDate: true,
    }),
    pageMargins: [40, 100, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString() || '',
              country.iso2 || '',
              country.iso3 || '',
              country.name || '',
              country.continent || '',
              country.local_name || '',
            ]),
          ],
        },
      },
    ],
  };
};
