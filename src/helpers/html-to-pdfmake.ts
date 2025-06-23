import htmlToPdfMake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

export const getHtmlContent = (html: string): any => {
  const { window } = new JSDOM();

  return htmlToPdfMake(html, window);
};
