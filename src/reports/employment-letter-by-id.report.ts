import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { employees } from 'generated/prisma';
import { DateFormatter } from 'src/helpers';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 12,
    alignment: 'center',
    margin: [0, 20, 0, 0],
  },
};

export const getEmploymentLetterByIdReport = (
  employees: employees,
): TDocumentDefinitions => {
  const { name, position, start_date, work_time, work_schedule } = employees;

  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      title: 'CONSTANCIA DE EMPLEO',
      subtitle: '',
      showLogo: true,
      showDate: true,
    }),
    content: [
      { text: 'EMPLOYMENT LETTER', style: 'header' },
      {
        text: `Yo, Rafael Eduardo Monsalve, en mi calidad de CEO de REDMOART SAS, por medio de la presente certifico que ${name} ha sido empleado en nuestra empresa desde el ${DateFormatter.formatDate(start_date)}.\n\n
        Durante su empleo, el Sr./Sra. ${name} ha desempeñado el cargo de ${position}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr./ Sra. ${name} es de ${DateFormatter.formatDate(work_time)} horas
        semanales, con un horario de ${work_schedule}, cumpliendo con las políticas y
        procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente, 
          Rafael Eduardo Monsalve
          CEO
          REDMOART SAS
          ${new Date().toISOString().split('T')[0]}`,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
