import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

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

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      title: '',
      subtitle: '',
      showLogo: false,
      showDate: false,
    }),
    content: [
      { text: 'EMPLOYMENT LETTER', style: 'header' },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa],
          por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra
          empresa desde el [Fecha de Inicio del Empleado].\n\n
          Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del
          Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
          labores.\n\n
          La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas
          semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
          procedimientos establecidos por la empresa.\n\n
          Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente, 
          [Nombre del Empleador]
          [Cargo del Empleador]
          [Nombre de la Empresa]
          [Fecha de Emisión]`,
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
